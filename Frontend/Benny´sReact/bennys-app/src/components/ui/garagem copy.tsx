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

interface CarData {
    id: number;
    Fabricante: string;
    MarcaFabricante: string;
    Proprietario: string;
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
    tipoOperacao: string | null;
    precoVenda: number | null;
    precoAluguelDia: number | null;
    disponibilidade: boolean | null;
}

const GaragePage = () => {
    const [carData, setCarData] = useState<CarData[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await fetch('http://localhost:8080/veiculo/garagem', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setCarData(data);
                } else {
                    console.error('Falha ao buscar dados dos carros na garagem');
                }
            } catch (error) {
                console.error('Erro ao buscar dados dos carros na garagem:', error);
            }
        };

        fetchCarData();
    }, [token]);

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mb-4">Garagem</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {carData.map((car) => (
                        <Dialog key={car.id}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Card key={car.id} className="card cursor-pointer">
                                        <CardHeader>
                                            <CardTitle>{car.Fabricante} {car.modelo}</CardTitle>
                                            <CardDescription>{car.ano}</CardDescription>
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
                                        <CardFooter className="flex justify-between items-center">
                                            <p>{car.transmissao}</p>
                                            <p>{car.tipoCombustivel}</p>
                                        </CardFooter>
                                    </Card>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" side="right">
                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                    <DropdownMenuItem>Vender</DropdownMenuItem>
                                    <DropdownMenuItem>Localização</DropdownMenuItem>
                                    <DropdownMenuItem>Seguro</DropdownMenuItem>
                                    <DropdownMenuItem>Acidentes</DropdownMenuItem>
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>Detalhes</DropdownMenuItem>
                                    </DialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                            <Input id="modelo" readOnly defaultValue={`${car.Fabricante} ${car.modelo} ${car.ano} ${car.segmento}`} />
                                        </div>
                                        
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="ano">
                                                Proprietario
                                                </Label>
                                                <Input id="ano" readOnly defaultValue={car.Proprietario} />
                                            </div>
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="ano">
                                                    Combustível
                                                </Label>
                                                <Input id="segmento" readOnly defaultValue={car.tipoCombustivel} />
                                            </div>
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="potencia">
                                                    Potência
                                                </Label>
                                                <Input id="potencia" readOnly defaultValue={car.potencia} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="transmissao">
                                                    Transmissão
                                                </Label>
                                                <Input id="transmissao" readOnly defaultValue={car.transmissao} />
                                            </div>
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="caixaVelocidades">
                                                    Caixa
                                                </Label>
                                                <Input id="caixaVelocidades" readOnly defaultValue={car.caixaVelocidades} />
                                            </div>
                                            <div className="grid items-center gap-4">
                                                <Label htmlFor="alimentacao">
                                                    Sobrealimentação
                                                </Label>
                                                <Input id="alimentacao" readOnly defaultValue={car.alimentacao} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className=" items-center gap-4 hidden sm:grid">
                                                <Label htmlFor="transmissao">
                                                    Tração
                                                </Label>
                                                <Input id="transmissao" readOnly defaultValue={car.traccao} />
                                            </div>
                                            <div className=" items-center gap-4 hidden sm:grid">
                                                <Label htmlFor="quilometragem">
                                                    Quilometragem
                                                </Label>
                                                <Input id="quilometragem" readOnly defaultValue={car.quilometragem} />
                                            </div>
                                            <div className=" items-center gap-4 hidden sm:grid">
                                                <Label htmlFor="numeroPortas">
                                                    Portas
                                                </Label>
                                                <Input id="numeroPortas" readOnly defaultValue={car.numeroPortas} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-4">
                                        <Label htmlFor="descricao">
                                            Descrição
                                        </Label>
                                        <Textarea
                                            id="descricao"
                                            value={car.descricao}
                                            readOnly
                                            className="min-h-24 w-full"
                                        />
                                    </div>
                                    <div className="gap-4  hidden sm:flex ">
                                        {car.fotos.split(',').map((foto: string, index: number) => (
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
                        </Dialog>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GaragePage;