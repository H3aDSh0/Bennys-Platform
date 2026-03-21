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
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react";





const formSchema = z.object({
    email: z.string().email({
        message: "Por favor, insira um endereço de e-mail válido.",
    }),
});



const ForgotPasswordPage = () => {
    const router = useRouter();
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false);



    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
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
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl">Recuperar palavra-passe</CardTitle>
                    </div>


                    <CardDescription>
                        Digite o e-mail para recuperar a palavra-passe
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>


                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                <FormField control={form.control} name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Insira o seu e-mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <Button type="submit" className="w-full">Recuperar</Button>
                                <div className=" grid">


                                </div>
                            </div>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            Voltar para  o Login? {" "}
                            <Link href="/login" className="underline"> Iniciar sessão </Link>
                        </div>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
export default ForgotPasswordPage;