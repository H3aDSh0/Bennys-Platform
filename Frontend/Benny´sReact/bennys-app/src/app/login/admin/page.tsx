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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from 'next/link';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Inbox } from 'lucide-react';





const formSchema = z.object({
    login: z.string().refine((value) => {
        // Verifica se o valor é um email válido ou um número de telefone válido
        return isValidEmail(value) || isValidPhoneNumber(value);
    }, {
        message: "Por favor, insira um endereço de e-mail válido ou um número de telefone válido."
    }),
    password: z.string().min(2, {
        message: "A senha deve ter pelo menos 2 caracteres.",
    }),
});

// Função para verificar se um valor é um email válido
function isValidEmail(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
}

// Função para verificar se um valor é um número de telefone válido
function isValidPhoneNumber(value: string): boolean {
    return /^\d{9}$/.test(value); // Verifica se o valor tem exatamente 9 dígitos
}

const LoginAdminPage = () => {
    const router = useRouter();
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false);



    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    })

    async function onSubmit(data: any) {

        const formData = form.getValues(); // Obtenha os dados do formulário

        // Opções para a requisição POST
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData) // Converte os dados do formulário para JSON
        };

        fetch('http://localhost:8080/auth/administrador/login', requestOptions)
            .then(response => {
                // Verificando se a resposta foi bem-sucedida
                if (!response.ok) {
                    // mensagem de erro
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
                // converter a resposta em JSON e
                return response.json();
            })
            .then(data => {
                console.log('Login bem-sucedido:', data);

                // Exibir alerta de sucesso
                toast({
                    variant: "success",
                    title: "Login bem-sucedido",
                    description: "Bem-vindo de volta!",
                })

                const { token } = data;

                // Armazenar token no sessionStorage
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('authorities', JSON.stringify(data.authorities));

                console.log('Conteúdo do sessionStorage:', sessionStorage);
                router.push('/dashboard');

            })
            .catch(error => {


                console.error('Erro durante o login:', error.message);

                // Exibir alerta de erro

                toast({
                    variant: "destructive",
                    title: "Falha ao fazer login",
                    description: error.message || "Erro desconhecido durante o login",
                })
            });
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            <Cross2Icon className="w-5 h-5" />
                        </Link>
                    </div>


                    <CardDescription>
                        Digite o seu e-mail para entrar na sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>


                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <FormField control={form.control} name="login"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email ou Número de Telemóvel</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o seu número de telefone ou e-mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField control={form.control} name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link href="/login/forgot-password" className="ml-auto inline-block text-sm underline">Esqueceu a palavra-passe?</Link>
                                            </div>
                                            <FormControl>
                                                <div className="relative">

                                                    <Input type={showPassword ? 'text' : 'password'} {...field} />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 focus:outline-none">
                                                        {showPassword ? <EyeSlashIcon className="w-4 h-4 text-gray-400" /> : <EyeIcon className="w-4 h-4 text-gray-400" />}
                                                    </button>
                                                </div>

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">Login</Button>

                                <div className=" grid">
                                <Link href="/login/magic-link">

                                <Button variant="outline" className="w-full gap-2">
                                        <Inbox />
                                        Login with Magic Link

                                    </Button>
                                    </Link>
                                    
                                </div>
                            </div>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            Ainda não tem conta?{" "}
                            <Link href="/registo" className="underline"> Criar conta </Link>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
export default LoginAdminPage;