"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import Image from "next/image"
import { Label } from "./label";
import { Textarea } from "./textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    Users2,
} from "lucide-react"
import ImageUploader from "./carPhotoUpload";
import AdicionarPropostaForm from "./AdicionarPropostas"



const formSchema = z.object({
    modelo: z.string().min(1, { message: "Por favor, insira o modelo do veículo." }),
    ano: z.string().length(4, { message: "Por favor, insira o ano do veículo no formato de quatro dígitos, por exemplo, 2024." }),
    segmento: z.string().min(1, { message: "Por favor, insira o segmento do veículo." }),
    tipoCombustivel: z.string().min(1, { message: "Por favor, insira o tipo de combustível do veículo." }),
    potencia: z.string().min(1, { message: "Por favor, insira a potência do veículo." })
    .refine(value => parseInt(value) > 0, {
        message: "O número de cavalos deve ser maior que zero.",
    }),
    transmissao: z.string().min(1, { message: "Por favor, insira o tipo de transmissão do veículo." }),
    caixaVelocidades: z.string().min(1, { message: "Por favor, insira o tipo de caixa de velocidades do veículo." })
    .refine(value => parseInt(value) > 0, {
        message: "O número de mudanças deve ser maior que zero.",
    }),
    alimentacao: z.string().min(1, { message: "Por favor, insira o tipo de alimentação do veículo." }),
    traccao: z.string().min(1, { message: "Por favor, insira o tipo de tração do veículo." }),
    quilometragem: z.string().min(1, { message: "Por favor, insira a quilometragem do veículo." })
    .refine(value => parseInt(value) >= 0, {
        message: "O número de quilómetros deve ser maior ou igual a zero.",
    }),
    numeroPortas: z.string().min(1, { message: "Por favor, insira o número de portas do veículo." })
    .refine(value => parseInt(value) > 0, {
        message: "O número de portas deve ser maior que zero.",
    }),
    condicao: z.string().min(1, { message: "Por favor, insira a condição do veículo." }),
    descricao: z.string().min(1, { message: "Por favor, insira uma descrição do veículo." }),
    fotos: z.string()
});



const AdicionarPropostaPage = () => {
    const { toast } = useToast();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 
    const [submitted, setSubmitted] = useState(false); 


    const handleImagesSelected = (imageFiles: File[]) => {
        setSelectedFiles(imageFiles);
    };


    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            modelo: "",
            ano: "",
            segmento: "",
            tipoCombustivel: "",
            potencia: "",
            transmissao: "",
            caixaVelocidades: "",
            alimentacao: "",
            traccao: "",
            quilometragem: "",
            numeroPortas: "",
            condicao: "",
            descricao: "",
            fotos: ""
        },
    })

    


    async function onSubmit(data: any) {
        const formData = form.getValues();
        //console.log("Selected files:", selectedFiles);

        try {
            const formFiles = new FormData();


            selectedFiles.forEach((file, index) => {
                formFiles.append(`files`, file);
            });

            // Enviar a solicitação para o servidor
            const response = await fetch("http://localhost:8080/upload/carsPhotos", {
                method: "POST",
                body: formFiles,
            });

            // Verificar se a solicitação foi bem-sucedida
            if (response.ok) {
                const data = await response.text();
                //console.log("Arquivos enviados com sucesso!" + data);
                formData.fotos = data;

                const isLoggedIn = sessionStorage.getItem('token');
                const username = sessionStorage.getItem('username');
                const formDataArray = [formData];
                //console.log(formDataArray);
                //console.log(isLoggedIn);

                // Enviar a solicitação para adicionar a proposta
                const responseProposta = await fetch("http://localhost:8080/fabricante/adicionar-propostas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${isLoggedIn}`,
                    },
                    body: JSON.stringify(formDataArray)
                });

                // Verificar se a solicitação para adicionar a proposta foi bem-sucedida
                if (responseProposta.ok) {
                    const dataProposta = await responseProposta.text();
                    toast({
                        variant: "success",
                        title: "Proposta adicionada com sucesso!",
                        description: dataProposta,
                    })
                    console.log("Proposta adicionada com sucesso!", dataProposta);
                    setSubmitted(true);
                }
            } 

    } catch (error: any) {
        console.error("Erro ao enviar os arquivos:", error);
        toast({
            variant: "destructive",
            title: "Erro ao adicionar a proposta",
            description: error.message,
        });
    }

    console.log("Form data:", formData);
}



/*
        const formData = form.getValues(); // Obtenha os dados do formulário
 
        // Opções para a requisição POST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Converte os dados do formulário para JSON
        };
 
        fetch('http://localhost:8080/account/forgotPassword', requestOptions)
            .then(response => {
                // Verificando se a resposta foi bem-sucedida
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
                return response.text();
            })
            .then(data => {
                console.log('Solicitação de redefinição da palavra-passe enviada com sucesso: ' + data);
                // Exibir alerta de sucesso
                toast({
                    variant: "success",
                    title: "Solicitação enviada",
                    description: "Sua solicitação de redefinição da palavra-passe foi enviada para o seu email com sucesso.",
                })
 
 
            })
            .catch(error => {
 
 
                console.error('Erro ao enviar a solicitação de redefinição de senha:' + error.message);
 
 
                // Exibir alerta de erro
 
                toast({
                    variant: "destructive",
                    title: "Falha ao enviar a solicitação",
                    description: error.message || "Erro desconhecido ao enviar a solicitação de redefinição de senha.",
                })
            });
            */
           
            if (submitted) {
                return (
                    <AdicionarPropostaForm />
                    
                );
            }


return (
    <>
        <Form {...form}>

            <div className=" grid  flex-1  gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Adicionar Proposta
                    </h1>
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm" type="submit" onClick={form.handleSubmit(onSubmit)}>Enviar Proposta</Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Detalhes do Veículo</CardTitle>
                                <CardDescription>
                                    Informações Básicas
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="modelo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Modelo</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="text"
                                                                className="w-full"
                                                                placeholder="718 Cayman GT4 RS"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="ano"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Ano</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="2024"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField control={form.control} name="descricao"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Descrição</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            id="descricao"
                                                            placeholder="Motor V12 com um som impressionante e uma aceleração dos 0 aos 100 km/h em apenas dois segundos. Design elegante e luxuoso, proporcionando uma condução emocionante em qualquer estrada."
                                                            className="min-h-32"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Detalhes Técnicos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="segmento"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Segmento</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="segmento"
                                                                >
                                                                    <SelectValue placeholder="Tipo de Segmento" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Coupé">Coupé</SelectItem>
                                                                    <SelectItem value="Cabrio">Cabrio</SelectItem>
                                                                    <SelectItem value="Citadino">Citadino</SelectItem>
                                                                    <SelectItem value="Desportivos">Desportivos</SelectItem>
                                                                    <SelectItem value="Sedan">Sedan</SelectItem>
                                                                    <SelectItem value="SUV">SUV</SelectItem>
                                                                    <SelectItem value="Supercarro">Supercarro</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="numeroPortas"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Número de Portas</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="5"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="tipoCombustivel"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Segmento</FormLabel>
                                                        <FormControl>   
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="tipoCombustivel"
                                                                >
                                                                    <SelectValue placeholder="Tipo de Combustível" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                                                                    <SelectItem value="Gasóleo">Gasóleo</SelectItem>
                                                                    <SelectItem value="Elétrico">Elétrico</SelectItem>
                                                                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="potencia"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Potência</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="500"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="transmissao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Transmissão</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="transmissao"
                                                                >
                                                                    <SelectValue placeholder="Tipo de Transmissao" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Automática">Automática</SelectItem>
                                                                    <SelectItem value="Manual">Manual</SelectItem>
                                                                    <SelectItem value="Semi-automática">Semi-Automática</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="caixaVelocidades"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Caixa de Velocidades</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="5"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="alimentacao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Sobrealimentação</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="alimentacao"
                                                                >
                                                                    <SelectValue placeholder="Tipo de Sobrealimentação" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Atmosférico">Atmosférico</SelectItem>
                                                                    <SelectItem value="Turbo">Turbo</SelectItem>
                                                                    <SelectItem value="Compressor">Compressor</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="traccao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Tracção</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="traccao"
                                                                >
                                                                    <SelectValue placeholder="Tipo de Tracção" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="4WD">4WD</SelectItem>
                                                                    <SelectItem value="RWD">RWD</SelectItem>
                                                                    <SelectItem value="AWD">AWD</SelectItem>
                                                                    <SelectItem value="FWD">FWD</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card
                            className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Imagens do Veículo</CardTitle>
                                <CardDescription>
                                    Adicione fotos do veículo para uma visualização detalhada.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ImageUploader handleImagesSelected={handleImagesSelected} />
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Outras Informações</CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div className="grid gap-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="condicao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Condição</FormLabel>
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger
                                                                    aria-label="condicao"
                                                                >
                                                                    <SelectValue placeholder="Condição" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Novo">Novo</SelectItem>
                                                                    <SelectItem value="Usado">Usado</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField control={form.control} name="quilometragem"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Quilometragem</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="150000"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm" type="submit" onClick={form.handleSubmit(onSubmit)}>Enviar Proposta</Button>
                </div>
            </div>
        </Form>
    </>



)
}
export default AdicionarPropostaPage;