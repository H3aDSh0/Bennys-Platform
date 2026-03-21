"use client"

import { ChangeEventHandler, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { any, z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import Stepper from '@/components/ui/Stepper';
import React, { ChangeEvent } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Cross2Icon } from '@radix-ui/react-icons';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';







const formSchema = z.object({
    nome: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    numeroTelemovel: z.string().length(9, {
        message: "O número de telemóvel têm de conter 9 caracteres.",
    }),
    cc: z.string().length(8, {
        message: "O CC têm de conter 8 caracteres.",
    }),
    nif: z.string().length(9, {
        message: "O NIF têm de conter 9 caracteres.",
    }),
    dataNascimento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Por favor, insira uma data válida no formato AAAA-MM-DD.",
    }),
    morada: z.string(),
    codigoPostal: z.string().regex(/^\d{4}-\d{3}$/, {
        message: "O código postal deve seguir o formato 0000-000.",
    }),
    localidade: z.string(),
    password: z
        .string()
        .min(8, {
            message: "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
            message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        }),
    fotoPerfil: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const fabricanteFormSchema = z.object({
    nome: z.string().min(2, {
        message: "O nome deve ter pelo menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
    numeroTelemovel: z.string().length(9, {
        message: "O número de telemóvel têm de conter 9 caracteres.",
    }),
    password: z
        .string()
        .min(8, {
            message: "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
            message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        }),
    nif: z.string().length(9, {
        message: "O NIF têm de conter 9 caracteres.",
    }),
    sede: z.string(),
    pais: z.string(),
    descricao: z.string(),
    portfolioVeiculos: z.string(),
    documentacaoCertificacao: z.string(),
    fotoPerfil: z.string(),
});

type FabricanteFormValues = z.infer<typeof fabricanteFormSchema>;

const RegistoPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState<"utilizador" | "fabricante">("utilizador");
    const totalSteps = 3;
    const [filePath, setFilePath] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordFabricante, setShowPasswordFabricante] = useState(false);



    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            email: "",
            numeroTelemovel: "",
            cc: "",
            nif: "",
            dataNascimento: "",
            morada: "",
            codigoPostal: "",
            localidade: "",
            password: "",
            fotoPerfil: "",
        },
    });

    const formFabricante = useForm<FabricanteFormValues>({
        resolver: zodResolver(fabricanteFormSchema),
        defaultValues: {
            nome: "",
            email: "",
            numeroTelemovel: "",
            password: "",
            nif: "",
            sede: "",
            pais: "",
            descricao: "",
            portfolioVeiculos: "",
            documentacaoCertificacao: "",
            fotoPerfil: "",
        },
    });

    const nextStep = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let isValid = false;


        if (step === 1) {
            isValid = await form.trigger(['nome', 'email', 'dataNascimento', 'password']);
        } else if (step === 2) {
            isValid = await form.trigger(['numeroTelemovel', 'morada', 'codigoPostal', 'localidade']);
        } else if (step === 3) {
            isValid = await form.trigger(['cc', 'nif', 'fotoPerfil']);
        }


        if (isValid && step < 3) {
            setStep((prevStep) => prevStep + 1);
        } else if (isValid && step === 3) {
            handleSubmit();
        }
    };

    const nextStepFabricante = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        let isValid = false;


        if (step === 1) {
            isValid = await formFabricante.trigger(['nome', 'email', 'password']);
        } else if (step === 2) {
            isValid = await formFabricante.trigger(['numeroTelemovel', 'sede', 'pais']);
        } else if (step === 3) {
            isValid = await formFabricante.trigger(['nif', 'descricao', 'portfolioVeiculos', 'documentacaoCertificacao', 'fotoPerfil']);
        }


        if (isValid && step < 3) {
            setStep((prevStep) => prevStep + 1);
        } else if (isValid && step === 3) {
            handleSubmitFabricante();
        }
    };


    const handleSubmit = async () => {
        const formData = form.getValues();
        console.log(formData);
        const moradaCompleta = `${formData.morada}, ${formData.codigoPostal}, ${formData.localidade}`;
        formData.morada = moradaCompleta;

        try {
            const response = await fetch('http://localhost:8080/auth/utilizador/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const responseData = await response.text();
                throw new Error(responseData);
            }


            console.log('Utilizador registado com sucesso:');

            toast({
                variant: "success",
                title: "Registo bem-sucedido",
                description: "Utilizador registado com sucesso",
            })

            router.push('/login');
            //const data = await response.text();
            //console.log(data);
        } catch (error: any) {
            console.error('Erro ao registar utilizador:', error.message);
            toast({
                variant: "destructive",
                title: "Falha ao fazer registo",
                description: error.message || "Erro desconhecido durante o registo",
            })
        }
    };




    const handleSubmitFabricante = async () => {
        const formData = formFabricante.getValues();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:8080/auth/fabricante/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Falha ao registar fabricante');
            }
            console.log('Fabricante registado com sucesso');

            toast({
                variant: "success",
                title: "Registo bem-sucedido",
                description: "Fabricante registado com sucesso",
            })
            //const data = await response.text(); 
            //console.log(data); 

            router.push('/login');

        } catch (error: any) {
            console.error('Erro ao registrar fabricante:', error.message);

            toast({
                variant: "destructive",
                title: "Falha ao fazer registo",
                description: error.message || "Erro desconhecido durante o registo",
            })
        }
        console.log("Data para o backend", formData);
    };

    const handleInputChange = (fieldName: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue(fieldName, e.target.value);
        form.trigger(fieldName);
    };

    const handleInputChangeFabricante = (fieldName: keyof FabricanteFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        formFabricante.setValue(fieldName, e.target.value);
        formFabricante.trigger(fieldName);
    };

    const handleInputChangeFabricanteTextArea = (fieldName: keyof FabricanteFormValues) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        formFabricante.setValue(fieldName, e.target.value);
        formFabricante.trigger(fieldName);
    };


    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };



    const handleInputFile = (fieldName: keyof FormValues, form: ReturnType<typeof useForm<FormValues>>, setFilePath: React.Dispatch<React.SetStateAction<string | null>>) => {
        return async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append(fieldName, file);


            try {
                const response = await fetch('http://localhost:8080/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const { filePath } = data;

                    setFilePath(filePath);


                    console.log('Caminho do arquivo:', filePath);
                    form.setValue(fieldName, filePath);
                } else {
                    throw new Error('Erro ao fazer upload do arquivo');
                }
            } catch (error) {
                console.error('Erro ao enviar o arquivo:', error);

            }
        };
    };



    const handleInputFileFabricante = (fieldName: keyof FabricanteFormValues, form: ReturnType<typeof useForm<FabricanteFormValues>>, setFilePath: React.Dispatch<React.SetStateAction<string | null>>) => {
        return async (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append(fieldName, file);


            try {
                const response = await fetch('http://localhost:8080/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    const { filePath } = data;

                    setFilePath(filePath);


                    console.log('Caminho do arquivo:', filePath);
                    form.setValue(fieldName, filePath);
                } else {
                    throw new Error('Erro ao fazer upload do arquivo');
                }
            } catch (error) {
                console.error('Erro ao enviar o arquivo:', error);

            }
        };
    };




    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">Registo</CardTitle>
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <Cross2Icon className="w-5 h-5" />
                        </Link>
                    </div>
                    <CardDescription>
                        Insira as suas informações para criar uma conta.
                    </CardDescription>
                    <Stepper step={step} totalSteps={totalSteps} />
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue={userType}>
                        {step === 1 && (
                            <>
                                <div className="grid gap-2 mb-4">
                                    <Label htmlFor="email">Tipo de Utilizador</Label>
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="utilizador">Utilizador</TabsTrigger>
                                        <TabsTrigger value="fabricante">Fabricante</TabsTrigger>
                                    </TabsList>
                                </div>
                            </>
                        )}
                        <TabsContent value="utilizador">
                            <Form {...form}>
                                <div className="grid gap-4">
                                    {step === 1 && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="nome"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Nome</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Pedro Martins"
                                                                    {...field}
                                                                    onChange={handleInputChange('nome')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="dataNascimento"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Data de Nascimento
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input type="date"
                                                                    {...field}
                                                                    onChange={handleInputChange('dataNascimento')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="moises@example.com"
                                                                {...field}
                                                                onChange={handleInputChange('email')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Palavra-Passe
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    type={showPassword ? 'text' : 'password'}
                                                                    {...field}
                                                                    onChange={handleInputChange('password')}
                                                                />
                                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 focus:outline-none">
                                                                    {showPassword ? <EyeSlashIcon className="w-4 h-4 text-gray-400" /> : <EyeIcon className="w-4 h-4 text-gray-400" />}
                                                                </button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="numeroTelemovel"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Número de Telemóvel
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="911911911"
                                                                {...field}
                                                                onChange={handleInputChange('numeroTelemovel')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="morada"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Morada
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Rua 25 de Abril"
                                                                {...field}
                                                                onChange={handleInputChange('morada')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="codigoPostal"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Codigo Postal
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="0000-000"
                                                                    {...field}
                                                                    onChange={handleInputChange('codigoPostal')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="localidade"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>
                                                                Localidade
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Lisboa"
                                                                    {...field}
                                                                    onChange={handleInputChange('localidade')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="cc"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Número de Cartão de Cidadão
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="15542891"
                                                                {...field}
                                                                onChange={handleInputChange('cc')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="nif"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Número de Identificação Fiscal
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="212767213"
                                                                {...field}
                                                                onChange={handleInputChange('nif')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="fotoPerfil"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Foto de Perfil
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input type='file' onChange={handleInputFile('fotoPerfil', form, setFilePath)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}
                                    <div className="flex justify-between">
                                        {step > 1 && (
                                            <Button variant="secondary" onClick={prevStep} className="flex items-center gap-2">
                                                <ChevronLeftIcon className="h-4 w-4" />
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            onClick={nextStep}
                                            className={`flex items-center gap-2 ${step === 1 ? 'flex-grow' : ''}`}
                                            style={{ width: step === 1 ? '100%' : 'auto' }}
                                        >
                                            {step < 3 ? "Next" : "Submit"}
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </TabsContent>
                        <TabsContent value="fabricante">
                            <Form {...formFabricante}>
                                <div className="grid gap-4">
                                    {step === 1 && (
                                        <>
                                            <FormField
                                                control={formFabricante.control}
                                                name="nome"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome da Fabricante</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Porsche"
                                                                {...field}
                                                                onChange={handleInputChangeFabricante('nome')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formFabricante.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Email</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="porsche@example.com"
                                                                {...field}
                                                                onChange={handleInputChangeFabricante('email')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formFabricante.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Password</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Input
                                                                    type={showPasswordFabricante ? 'text' : 'password'}
                                                                    {...field}
                                                                    onChange={handleInputChangeFabricante('password')}
                                                                />
                                                                <button type="button" onClick={() => setShowPasswordFabricante(!showPasswordFabricante)} className="absolute inset-y-0 right-0 pr-3 focus:outline-none">
                                                                    {showPasswordFabricante ? <EyeSlashIcon className="w-4 h-4 text-gray-400" /> : <EyeIcon className="w-4 h-4 text-gray-400" />}
                                                                </button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>)}
                                    {step === 2 && (
                                        <>
                                            <FormField
                                                control={formFabricante.control}
                                                name="numeroTelemovel"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Número de Telemóvel</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="213452131"
                                                                {...field}
                                                                onChange={handleInputChangeFabricante('numeroTelemovel')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={formFabricante.control}
                                                    name="sede"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Sede</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Stuttgart"
                                                                    {...field}
                                                                    onChange={handleInputChangeFabricante('sede')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formFabricante.control}
                                                    name="pais"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>País</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="Alemanha"
                                                                    {...field}
                                                                    onChange={handleInputChangeFabricante('pais')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </>
                                    )}
                                    {step === 3 && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">

                                                <FormField
                                                    control={formFabricante.control}
                                                    name="nif"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Número de Identificação Fiscal</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="213543123"
                                                                    {...field}
                                                                    onChange={handleInputChangeFabricante('nif')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={formFabricante.control}
                                                    name="documentacaoCertificacao"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Documentação de Certificação</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    placeholder="ISO 9001:2015, ISO 14001:2015"
                                                                    {...field}
                                                                    onChange={handleInputChangeFabricante('documentacaoCertificacao')}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <FormField
                                                control={formFabricante.control}
                                                name="descricao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Descrição</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Fabricante de carros esportivos de alta performance"
                                                                {...field}
                                                                onChange={handleInputChangeFabricanteTextArea('descricao')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={formFabricante.control}
                                                name="portfolioVeiculos"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Portfolio de Veículos</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="https://www.porsche.com/"
                                                                {...field}
                                                                onChange={handleInputChangeFabricante('portfolioVeiculos')}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            <FormField
                                                control={formFabricante.control}
                                                name="fotoPerfil"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Logotipo da Fabricante</FormLabel>
                                                        <FormControl>
                                                            <Input type='file' onChange={handleInputFileFabricante('fotoPerfil', formFabricante, setFilePath)} />

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>)}
                                    <div className="flex justify-between">
                                        {step > 1 && (
                                            <Button variant="secondary" onClick={prevStep} className="flex items-center gap-2">
                                                <ChevronLeftIcon className="h-4 w-4" />
                                                Previous
                                            </Button>
                                        )}
                                        <Button
                                            onClick={nextStepFabricante}
                                            className={`flex items-center gap-2 ${step === 1 ? 'flex-grow' : ''}`}
                                            style={{ width: step === 1 ? '100%' : 'auto' }}
                                        >
                                            {step < 3 ? "Next" : "Submit"}
                                            <ChevronRightIcon className="h-4 w-4" />
                                        </Button>
                                    </div>


                                </div>

                            </Form>
                        </TabsContent>
                    </Tabs>
                    {step === 1 && (<div className="mt-4 text-center text-sm">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>)}

                </CardContent>
            </Card>
        </div>
    );
};

export default RegistoPage;

