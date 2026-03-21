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

interface UserRole {
    authority: string;
}

const HomePage = () => {
    const [carData, setCarData] = useState<CarData[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState<string | null>(null);
    const [filteredCarData, setFilteredCarData] = useState<CarData[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [minYear, setMinYear] = useState<number | null>(null);
    const [maxYear, setMaxYear] = useState<number | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [fuelType, setFuelType] = useState<string>("");
    const [minPower, setMinPower] = useState<number | null>(null);
    const [maxPower, setMaxPower] = useState<number | null>(null);
    const [model, setModel] = useState<string>("");


    const [submitted, setSubmitted] = useState(false);

    const token = sessionStorage.getItem('token');
    const userRolesString = sessionStorage.getItem('authorities');
    const userRoles: UserRole[] = userRolesString ? JSON.parse(userRolesString) : [];

    const isUtilizador = userRoles.some(role => role.authority === 'ROLE_Utilizador');
    const username = sessionStorage.getItem('username');




    const handleBrandClick = (brand: string) => {
        if (selectedBrand === brand) {
            setSelectedBrand(null);
            setFilteredCarData([]);
        } else {
            const filteredCars = carData.filter(car => car.fabricante === brand);
            setSelectedBrand(brand);
            setFilteredCarData(filteredCars);
        }
    };

    const handleReset = () => {
        setMinYear(null);
        setMaxYear(null);
        setMinPower(null);
        setMaxPower(null);
        setFuelType("");
        setMinPrice(null);
        setMaxPrice(null);
    };


    const handleBuy = async (carId: number) => {
        try {
            const response = await fetch('http://localhost:8080/veiculo/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ idVeiculo: carId })
            });

            if (!response.ok) {
                throw new Error('Falha ao comunicar com o servidor. Por favor, tente novamente.');
            }

            const resposta = await response.json();
            console.log(resposta);

            if (resposta.status === "sucesso") {
                toast({
                    variant: "success",
                    title: "Veículo comprado com sucesso.",
                    description: resposta.mensagem || "Veículo comprado com sucesso."
                });
                setSubmitted(true);
            } else if (resposta.status === "erro") {
                toast({
                    variant: "destructive",
                    title: "Erro ao comprar o veículo ",
                    description: resposta.mensagem || "Ocorreu um erro ao comprar o veículo à venda."
                });
            }

        } catch (error) {
            console.error('Erro ao comprar o veículo:', error);
        }
    }




    useEffect(() => {
        const fetchCarData = async () => {
            try {
                let url = 'http://localhost:8080/veiculo/disponiveis';
                const params = new URLSearchParams();

                // Add only parameters with non-empty values
                if (minYear !== null && !isNaN(minYear)) params.append('anoMinimo', minYear.toString());
                if (maxYear !== null && !isNaN(maxYear)) params.append('anoMaximo', maxYear.toString());
                if (minPrice !== null && !isNaN(minPrice)) params.append('precoMinimo', minPrice.toString());
                if (maxPrice !== null && !isNaN(maxPrice)) params.append('precoMaximo', maxPrice.toString());
                if (fuelType !== "") params.append('tipoCombustivel', fuelType);
                if (minPower !== null && !isNaN(minPower)) params.append('potenciaMinima', minPower.toString());
                if (maxPower !== null && !isNaN(maxPower)) params.append('potenciaMaxima', maxPower.toString());

                url += `?${params.toString()}`;

                const response = await fetch(url);
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
    }, [minYear, maxYear, minPrice, maxPrice, fuelType, minPower, maxPower]);


    const openDialog = (type: string, car: CarData) => {
        setSelectedCar(car);
        setDialogType(type);
        setDialogOpen(true);
    };

    if (submitted) {
        return (
            <HomePage />

        );
    }


    const renderDialogContent = () => {
        if (!selectedCar) return null;

        switch (dialogType) {
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


                    <div className="pb-6">
                        <div className="hidden md:flex gap-2 w-full">
                            {Array.from(new Set(carData.map(car => car.fabricante))).map((brand, index) => {
                                const carWithBrand = carData.find(car => car.fabricante === brand);
                                if (carWithBrand) {
                                    const selectedClass = selectedBrand === brand ? 'selected' : '';

                                    return (
                                        <div
                                            key={index}
                                            className={`cursor-pointer flex items-center justify-center rounded-xl border bg-card text-card-foreground shadow p-2 ${selectedClass} flex-grow`}
                                            onClick={() => handleBrandClick(brand)}
                                        >
                                            <Image
                                                alt={brand}
                                                src={`/${carWithBrand.marcaFabricante}`}
                                                width={35}
                                                height={35}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Card className="pt-4" style={{ maxWidth: '250px' }}>
                            <CardContent>
                                <div className="grid gap-2">
                                    <div>
                                        <Label>Ano: </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="number" id="minYear" value={minYear !== null ? minYear.toString() : ""} onChange={(e) => setMinYear(parseInt(e.target.value))} placeholder="Ano Mínimo" />
                                            <Input type="number" id="maxYear" value={maxYear !== null ? maxYear.toString() : ""} onChange={(e) => setMaxYear(parseInt(e.target.value))} placeholder="Ano Máximo" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Potência: </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="number" id="minPower" value={minPower !== null ? minPower.toString() : ""} onChange={(e) => setMinPower(parseInt(e.target.value))} placeholder="Potência Mínima" />
                                            <Input type="number" id="maxPower" value={maxPower !== null ? maxPower.toString() : ""} onChange={(e) => setMaxPower(parseInt(e.target.value))} placeholder="Potência Máxima" />
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Tipo de Combustível: </Label>
                                        <Select onValueChange={(value) => setFuelType(value)} defaultValue={fuelType}>
                                            <SelectTrigger aria-label="tipoCombustivel">
                                                <SelectValue placeholder="Tipo de Combustível" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Gasolina">Gasolina</SelectItem>
                                                <SelectItem value="Gasóleo">Gasóleo</SelectItem>
                                                <SelectItem value="Elétrico">Elétrico</SelectItem>
                                                <SelectItem value="Híbrido">Híbrido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Preço: </Label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <Input type="number" id="minPrice" value={minPrice !== null ? minPrice.toString() : ""} onChange={(e) => setMinPrice(parseInt(e.target.value))} placeholder="Preço Mínimo" />
                                            <Input type="number" id="maxPrice" value={maxPrice !== null ? maxPrice.toString() : ""} onChange={(e) => setMaxPrice(parseInt(e.target.value))} placeholder="Preço Máximo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button variant="outline" onClick={handleReset}>Reset</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">

                            {(selectedBrand === null ? carData : filteredCarData).map((car) => (
                                <DropdownMenu key={car.id}>
                                    <DropdownMenuTrigger asChild>
                                        <Card key={car.id} className="card cursor-pointer">
                                            <CardHeader>
                                                <CardTitle className="flex justify-between items-center">
                                                    <span>{car.fabricante} {car.modelo}</span>
                                                    <div className="relative w-6 h-6">
                                                        <Image
                                                            alt="Product image"
                                                            className="rounded-md object-cover"
                                                            layout="fill"
                                                            src={`/${car.marcaFabricante}`}
                                                            style={{ objectFit: 'contain' }}
                                                        />
                                                    </div>

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
                                        {isUtilizador && car.proprietario !== username && (
                                            <DropdownMenuItem onClick={() => handleBuy(car.id)}>Comprar</DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem onClick={() => openDialog('detalhes', car)}>Detalhes</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ))}
                        </div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            {renderDialogContent()}
                        </Dialog>
                    </div>
                </div>
            </>
        );
    };
}

export default HomePage;