"use client"

import { ChangeEventHandler, useEffect, useState } from "react";
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


import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import ValidateToken from "@/components/ui/validateToken";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';







const formSchema = z.object({
    novaPalavraPasse: z
        .string()
        .min(8, {
            message: "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
            message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.",
        }),
});

type FormValues = z.infer<typeof formSchema>;


const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();



    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            novaPalavraPasse: "",
        },
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            setToken(token);
        }
    }, []);

    async function onSubmit(data: any) {
        const formData = form.getValues(); // Obtenha os dados do formulário
        console.log("token:", token);
        console.log(formData);



        try {
            const response = await fetch('http://localhost:8080/account/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const responseData = await response.text();
                throw new Error(responseData);
            }

            const data = await response.text();
            console.log(data);

            toast({
                variant: "success",
                title: "Redefinição da Palavra-Passe",
                description: "A sua palavra-passe foi redefinida com sucesso.",
            })

            router.push('/login');

        } catch (error: any) {
            console.error('Erro ao redefinir palavra passe:', error.message);

            toast({
                variant: "destructive",
                title: "Erro na Redefinição da Palavra-Passe",
                description: error.message || "Ocorreu um erro ao tentar redefinir a sua palavra-passe. Por favor, tente novamente mais tarde.",
            })
        }
    };






    const handleInputChange = (fieldName: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue(fieldName, e.target.value);
        form.trigger(fieldName);
    };



    return (
        <div className="flex justify-center items-center h-screen">
            <ValidateToken>
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl">Redefinir Palavra-Passe</CardTitle>
                        </div>
                        <CardDescription>
                            Por favor, insira sua nova palavra-passe
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>

                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="novaPalavraPasse"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nova Palavra-Passe
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? 'text' : 'password'}
                                                            {...field}
                                                            onChange={handleInputChange('novaPalavraPasse')}
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
                                    <Button type="submit" className="w-full" >Confirmar</Button>
                                    <div className=" grid">


                                    </div>
                                </div>
                            </form>

                            <div className="mt-4 text-center text-sm">
                                Voltar para Login? {" "}
                                <Link href="/login" className="underline"> Iniciar sessão </Link>
                            </div>
                        </Form>
                    </CardContent>
                </Card>
            </ValidateToken>
        </div>

    );
};

export default ResetPasswordPage;

