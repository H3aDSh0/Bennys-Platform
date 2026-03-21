"use client"

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { BatteryCharging, Fuel, MoreHorizontal } from 'lucide-react';

import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown-menu';
import { Button } from './button';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { toast } from './use-toast';

interface CarData {
    id: number;
    modelo: string;
    ano: number;
    segmento: string;
    tipoCombustivel: string;
    potencia: number;
    transmissao: string;
    caixaVelocidades: number;
    alimentacao: string;
    traccao: string;
    quilometragem: number;
    numeroPortas: number;
    condicao: string;
    descricao: string;
    fotos: string;
    tipoOperacao: string,
    precoVenda: number,
    precoAluguelDia: number,
    disponibilidade: string,
    marcaFabricante: string,
    proprietario: string,
    fabricante: string,
}




const formSchema = z.object({
    idVeiculo: z.number(),
    tipoOperacao: z.string().min(1),
    precoVenda: z.number().min(1, { message: "Por favor, insira um preço de venda válido." })
        .refine(value => value > 0, {
            message: "O preço tem que ser superior a zero."
        }),
    precoAluguelDia: z.string(),
    disponibilidade: z.string().nullable(),
});

const HomePage = () => {
    const [carData, setCarData] = useState<CarData[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const [tipoOperacao, setTipoOperacao] = useState('Venda');

    const token = sessionStorage.getItem('token');



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idVeiculo: 0,
            tipoOperacao: "Venda",
            precoVenda: 1,
            precoAluguelDia: "",
            disponibilidade: "Disponível",
        },
    })



    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('http://localhost:8080/veiculo/disponiveis', {
                });
                if (response.ok) {
                    const data = await response.json();
                    setCarData(data);
                } else {
                    console.error('Falha ao buscar dados dos carros no marketplace');
                }
            } catch (error) {
                console.error('Erro ao buscar dados dos carros no marketplace:', error);
            }
        };

        fetchCarData();
    }, [token]);



    const openDialog = (type: string, car: CarData) => {
        setSelectedCar(car);
        setDialogType(type);
        setDialogOpen(true);
    };



    const renderDialogContent = () => {
        if (!selectedCar) return null;

        switch (dialogType) {
            case 'vender':
                return (
                    <>
                        <DialogContent className="rounded max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Vender Carro</DialogTitle>
                                <DialogDescription>Detalhes sobre a venda do carro.</DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-4">
                                        <FormField control={form.control} name="tipoOperacao"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tipo de Venda</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={field.onChange} defaultValue={field.value}
                                                        >
                                                            <SelectTrigger
                                                                aria-label="tipoOperacao"
                                                            >
                                                                <SelectValue placeholder="Tipo de Venda" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Venda">Venda</SelectItem>
                                                                <SelectItem value="Aluguel">Aluguel</SelectItem>
                                                                <SelectItem value="Ambos">Ambos</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    {(form.watch('tipoOperacao') === 'Venda') && (
                                        <div className="grid gap-4">
                                            <FormField control={form.control} name="precoVenda"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Preço de Venda</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="precoVenda"
                                                                type="number"
                                                                placeholder="Preço de Venda"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = parseFloat(e.target.value);
                                                                    if (!isNaN(value)) {
                                                                        field.onChange(value);
                                                                    } else {
                                                                        field.onChange('');
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                    {(form.watch('tipoOperacao') === 'Aluguel') && (
                                        <div className="grid gap-4">
                                            <FormField control={form.control} name="precoAluguelDia"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Preço de Aluguel por Dia</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                className="w-full"
                                                                placeholder="Preço de Aluguel"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                    {(form.watch('tipoOperacao') === 'Ambos') && (
                                        <>
                                            <div className="grid gap-4">
                                                <FormField control={form.control} name="precoVenda"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Preço de Venda</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    className="w-full"
                                                                    placeholder="Preço de Venda"
                                                                    {...field}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        if (!isNaN(value)) {
                                                                            field.onChange(value);
                                                                        } else {
                                                                            field.onChange('');
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-4">
                                                <FormField control={form.control} name="precoAluguelDia"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Preço de Aluguel por Dia</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    className="w-full"
                                                                    placeholder="Preço de Aluguel"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="flex justify-end">
                                        <Button size="sm" type="submit" >Vender</Button>
                                    </div>
                                </div>
                            </Form>
                        </DialogContent>
                    </>
                );
            case 'detalhes':
                return (
                    <>
                        <DialogContent className="rounded max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>Detalhes do Carro</DialogTitle>
                                <DialogDescription>
                                    Aqui estão mais detalhes sobre o carro.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="grid gap-4">
                                        <Label htmlFor="modelo">
                                            Modelo
                                        </Label>
                                        <Input id="modelo" readOnly defaultValue={`${selectedCar.fabricante} ${selectedCar.modelo} ${selectedCar.ano} ${selectedCar.segmento}`} />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="ano">
                                                Proprietario
                                            </Label>
                                            <Input id="ano" readOnly defaultValue={selectedCar.proprietario} />
                                        </div>
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="ano">
                                                Combustível
                                            </Label>
                                            <Input id="segmento" readOnly defaultValue={selectedCar.tipoCombustivel} />
                                        </div>
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="potencia">
                                                Potência
                                            </Label>
                                            <Input id="potencia" readOnly defaultValue={selectedCar.potencia} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="transmissao">
                                                Transmissão
                                            </Label>
                                            <Input id="transmissao" readOnly defaultValue={selectedCar.transmissao} />
                                        </div>
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="caixaVelocidades">
                                                Caixa
                                            </Label>
                                            <Input id="caixaVelocidades" readOnly defaultValue={selectedCar.caixaVelocidades} />
                                        </div>
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="alimentacao">
                                                Sobrealimentação
                                            </Label>
                                            <Input id="alimentacao" readOnly defaultValue={selectedCar.alimentacao} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className=" items-center gap-4 hidden sm:grid">
                                            <Label htmlFor="transmissao">
                                                Tração
                                            </Label>
                                            <Input id="transmissao" readOnly defaultValue={selectedCar.traccao} />
                                        </div>
                                        <div className=" items-center gap-4 hidden sm:grid">
                                            <Label htmlFor="quilometragem">
                                                Quilometragem
                                            </Label>
                                            <Input id="quilometragem" readOnly defaultValue={selectedCar.quilometragem} />
                                        </div>
                                        <div className=" items-center gap-4 hidden sm:grid">
                                            <Label htmlFor="numeroPortas">
                                                Portas
                                            </Label>
                                            <Input id="numeroPortas" readOnly defaultValue={selectedCar.numeroPortas} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4">
                                    <Label htmlFor="descricao">
                                        Descrição
                                    </Label>
                                    <Textarea
                                        id="descricao"
                                        value={selectedCar.descricao}
                                        readOnly
                                        className="min-h-24 w-full"
                                    />
                                </div>
                                <div className="gap-4  hidden sm:flex ">
                                    {selectedCar.fotos.split(',').map((foto: string, index: number) => (
                                        <Image
                                            key={index}
                                            alt="Car image"
                                            className="aspect-square rounded-md object-cover border border-dashed pointer"
                                            src={`/${foto.trim()}`}
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'contain' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </DialogContent>
                    </>
                );
            default:
                return null;
        }
    };

    if (carData.length === 0) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
                <p>O Marketplace está vazia.</p>
            </div>
        );
    } else {
        return (
            <>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Marketplace</h1>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {carData.map((car) => (
                            <DropdownMenu key={car.id}>
                                <DropdownMenuTrigger asChild>
                                    <Card key={car.id} className="card cursor-pointer">
                                        <CardHeader>
                                            <CardTitle className="flex justify-between items-center">
                                                <span>{car.fabricante} {car.modelo}</span>
                                            </CardTitle>
                                            <CardDescription>
                                                <span>{car.ano}</span>
                                            </CardDescription>

                                        </CardHeader>
                                        <CardContent>
                                            <div className="w-full h-56 relative">
                                                <Image
                                                    alt="Product image"
                                                    className="rounded-md object-cover"
                                                    layout="fill"
                                                    src={`/${car.fotos.split(',')[0].trim()}`}
                                                    style={{ objectFit: 'contain' }}
                                                />

                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end items-end">

                                            <p className="text-lg font-bold">
                                                {car.precoVenda?.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' })}
                                            </p>
                                        </CardFooter>
                                    </Card>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" side="right">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <Separator />
                                    <DropdownMenuItem onClick={() => openDialog('comprar', car)}>Comprar</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => openDialog('detalhes', car)}>Detalhes</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ))}
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        {renderDialogContent()}
                    </Dialog>
                </div>
            </>
        );
    };
}

export default HomePage;