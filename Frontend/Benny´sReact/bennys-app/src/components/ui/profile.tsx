import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateProfile, UserProfile, UserProfileUpdate } from '../apiRequests';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { z, ZodError } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { toast } from './use-toast';


const userProfileSchema = z.object({
    nome: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    numeroTelemovel: z.string().length(9, {
        message: "O número de telemóvel deve conter 9 caracteres.",
    }),
    cc: z.string().length(8, {
        message: "O CC deve conter 8 caracteres.",
    }).optional(),
    nif: z.string().length(9, {
        message: "O NIF deve conter 9 caracteres.",
    }).optional(),
    dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Por favor, insira uma data válida no formato AAAA-MM-DD.",
    }),
    morada: z.string().optional(),
    password: z.string().optional(),
    fotoPerfil: z.string().optional(),
    sede: z.string().optional(),
    pais: z.string().optional(),
    descricao: z.string().optional(),
    portfolioVeiculos: z.string().optional(),
    documentacaoCertificacao: z.string().optional(),
    cargo: z.string().optional(),
});

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

const ProfileSettings = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editable, setEditable] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfileUpdate>({});
    const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});
    const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchUserProfile(token)
                .then((profile) => {
                    setUserProfile(profile);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Erro ao buscar perfil do usuário:', error);
                    setLoading(false);
                });
        } else {
            console.error('Token de autenticação não encontrado no sessionStorage');
            setLoading(false);
        }
        const authoritiesString = sessionStorage.getItem('authorities');

        const authorities: { authority: string }[] = authoritiesString ? JSON.parse(authoritiesString) : [];
        const roles: string[] = authorities.map(auth => auth.authority);
        setUserRoles(roles);
        console.log(roles);
    }, []);

    const handleEditClick = () => {
        console.log('Clicou em Editar');
        setEditable(true);
        console.log(userProfile);
        setEditedProfile(userProfile ? { ...userProfile } : {});
    };

    const handleCancelClick = () => {
        console.log("Clicou em Cancelar");
        setEditable(false);
        setEditedProfile({});
        setFormErrors({}); // Clear form errors
    };

    const handleSaveClick = async () => {
        try {
            await updateProfile(sessionStorage.getItem('token') || '', editedProfile);
            const updatedProfile = Object.assign({}, userProfile, editedProfile);
            setUserProfile(updatedProfile);
            setEditable(false);
            setEditedProfile({});

            toast({
                variant: "success",
                title: "Perfil atualizado com sucesso!",
                description: "As alterações no perfil foram salvas com sucesso.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao salvar perfil",
                description: "Ocorreu um erro ao tentar salvar o perfil. Por favor, tente novamente mais tarde.",
            });
            console.error('Erro ao salvar perfil:', error);
        }
    };

    const handleInputChange = (fieldName: keyof UserProfileFormValues, value: string) => {
        setEditedProfile({ ...editedProfile, [fieldName]: value });
    };

    const validateField = (fieldName: keyof UserProfileFormValues, value: string) => {
        try {
            userProfileSchema.pick({ [fieldName]: true }).parse({ [fieldName]: value });
            setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: undefined }));
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors.find((err) => err.path[0] === fieldName)?.message;
                setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
            }
        }
    };


    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!userProfile) {
        return <div>Perfil do usuário não encontrado.</div>;
    }

    return (
        <>


            {/*form do perfil do utilizador*/}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Perfil</h3>
                    <p className="text-sm text-muted-foreground">
                        Esta página permite visualizar e editar os detalhes do seu perfil. Aqui, você pode encontrar todas as informações relacionadas à sua conta e personalizá-las conforme necessário.
                    </p>
                </div>
                <Separator />

                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="fotoPerfil">Foto Perfil</Label>
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={editedProfile.fotoPerfil ?? userProfile.fotoPerfil} className="object-contain w-full h-full" />
                            <AvatarFallback>{editedProfile.nome ?? userProfile.nome}</AvatarFallback>
                        </Avatar>
                        <Input
                            id="fotoPerfil"
                            type="text"
                            className="w-full hidden"
                            value={editedProfile.fotoPerfil ?? userProfile.fotoPerfil}
                            onChange={(e: { target: { value: string; }; }) => handleInputChange('fotoPerfil', e.target.value)}
                            readOnly={!editable}
                        />
                        {/* Error message for fotoPerfil field */}
                        {formErrors.fotoPerfil && <p>{formErrors.fotoPerfil}</p>}

                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            type="text"
                            className="w-full"
                            value={editedProfile.nome ?? userProfile.nome}
                            onChange={(e: { target: { value: string; }; }) => {
                                handleInputChange('nome', e.target.value);
                                validateField('nome', e.target.value);
                            }}
                            readOnly={!editable}
                        />
                        {/* Error message for nome field */}
                        {formErrors.nome && <p>{formErrors.nome}</p>}

                        {/* Add the remaining fields and corresponding error messages */}

                        <Label htmlFor="Email">Email</Label>
                        <Input
                            id="Email"
                            type="email"
                            className="w-full"
                            value={userProfile.email}
                            readOnly={true}
                        />

                        <Label htmlFor="numeroTelemovel">Número de Telemóvel:</Label>
                        <Input
                            id="numeroTelemovel"
                            type="text"
                            className="w-full"
                            value={editedProfile.numeroTelemovel ?? userProfile.numeroTelemovel}
                            onChange={(e: { target: { value: string; }; }) => {
                                handleInputChange('numeroTelemovel', e.target.value);
                                validateField('numeroTelemovel', e.target.value);
                            }}
                            readOnly={!editable}
                        />
                        {/* Error message for numeroTelemovel field */}
                        {formErrors.numeroTelemovel && <p>{formErrors.numeroTelemovel}</p>}

                        {/* Conditional rendering based on user roles */}
                        {userRoles.includes('ROLE_Admin') && (
                            <>
                                <Label htmlFor="cc">CC:</Label>
                                <Input
                                    id="cc"
                                    type="text"
                                    className="w-full"
                                    value={userProfile.cc}
                                    readOnly={true}
                                />
                                <Label htmlFor="cargo">Cargo:</Label>
                                <Input
                                    id="cargo"
                                    type="text"
                                    className="w-full"
                                    value={userProfile.cargo}
                                    readOnly={true}
                                />
                            </>
                        )}

                        {userRoles.includes('ROLE_Fabricante') && (
                            <>
                                <Label htmlFor="nif">Nif:</Label>
                                <Input
                                    id="nif"
                                    type="text"
                                    className="w-full"
                                    value={userProfile.nif}
                                    readOnly={true}
                                />
                                <Label htmlFor="sede">Sede:</Label>
                                <Input
                                    id="sede"
                                    type="text"
                                    className="w-full"
                                    value={editedProfile.sede ?? userProfile.sede}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('sede', e.target.value);
                                        validateField('sede', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for sede field */}
                                {formErrors.sede && <p>{formErrors.sede}</p>}

                                <Label htmlFor="pais">País:</Label>
                                <Input
                                    id="pais"
                                    type="text"
                                    className="w-full"
                                    value={editedProfile.pais ?? userProfile.pais}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('pais', e.target.value);
                                        validateField('pais', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for pais field */}
                                {formErrors.pais && <p>{formErrors.pais}</p>}

                                <Label htmlFor="descricao">Descrição:</Label>
                                <Textarea
                                    id="descricao"
                                    className="min-h-10"
                                    value={editedProfile.descricao ?? userProfile.descricao}
                                    onChange={(e) => {
                                        handleInputChange('descricao', e.target.value);
                                        validateField('descricao', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for descricao field */}
                                {formErrors.descricao && <p>{formErrors.descricao}</p>}

                                <Label htmlFor="portfolioVeiculos">Portfolio de Veículos:</Label>
                                <Input
                                    id="portfolioVeiculos"
                                    type="text"
                                    className="w-full"
                                    value={editedProfile.portfolioVeiculos ?? userProfile.portfolioVeiculos}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('portfolioVeiculos', e.target.value);
                                        validateField('portfolioVeiculos', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for portfolioVeiculos field */}
                                {formErrors.portfolioVeiculos && <p>{formErrors.portfolioVeiculos}</p>}

                                <Label htmlFor="documentacaoCertificacao">Documentação de Certificação:</Label>
                                <Input
                                    id="documentacaoCertificacao"
                                    type="text"
                                    className="w-full"
                                    value={editedProfile.documentacaoCertificacao ?? userProfile.documentacaoCertificacao}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('documentacaoCertificacao', e.target.value);
                                        validateField('documentacaoCertificacao', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for documentacaoCertificacao field */}
                                {formErrors.documentacaoCertificacao && <p>{formErrors.documentacaoCertificacao}</p>}
                            </>
                        )}

                        {userRoles.includes('ROLE_Utilizador') && (
                            <>
                                <Label htmlFor="cc">CC:</Label>
                                <Input
                                    id="cc"
                                    type="text"
                                    className="w-full"
                                    value={userProfile.cc}
                                    readOnly={!editable}
                                />
                                {/* Error message for cc field */}
                                {formErrors.cc && <p>{formErrors.cc}</p>}

                                <Label htmlFor="nif">NIF:</Label>
                                <Input
                                    id="nif"
                                    type="text"
                                    className="w-full"
                                    value={userProfile.nif}
                                    readOnly={true}
                                />

                                <Label htmlFor="dataNascimento">Data de Nascimento:</Label>
                                <Input
                                    id="dataNascimento"
                                    type="date"
                                    className="w-full"
                                    value={editedProfile.dataNascimento ?? userProfile.dataNascimento}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('dataNascimento', e.target.value);
                                        validateField('dataNascimento', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for dataNascimento field */}
                                {formErrors.dataNascimento && <p>{formErrors.dataNascimento}</p>}

                                <Label htmlFor="morada">Morada:</Label>
                                <Input
                                    id="morada"
                                    type="text"
                                    className="w-full"
                                    value={editedProfile.morada ?? userProfile.morada}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        handleInputChange('morada', e.target.value);
                                        validateField('morada', e.target.value);
                                    }}
                                    readOnly={!editable}
                                />
                                {/* Error message for morada field */}
                                {formErrors.morada && <p>{formErrors.morada}</p>}
                            </>
                        )}
                    </div>

                    {formErrors.nome && <p>{formErrors.nome}</p>}

                    {/* Buttons */}
                    <div >

                        {editable ? (
                            <>
                                <Button
                                    type="button" // Change the button type to "button"
                                    onClick={handleSaveClick} // Call handleSaveClick function
                                    className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition-colors mr-4"
                                    disabled={Object.values(formErrors).some((error) => error !== undefined)}
                                >
                                    Guardar
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleCancelClick}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-colors"
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                onClick={handleEditClick}
                                className="bg-primary text-white px-4 py-2 rounded-md shadow-md hover:bg-primary-dark transition-colors"
                            >
                                Editar
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSettings;
