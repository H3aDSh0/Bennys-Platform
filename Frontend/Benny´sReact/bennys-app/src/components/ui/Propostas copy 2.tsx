"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"
import Link from "next/link"
import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Label } from "./label"
import { Textarea } from "./textarea"

const PropostaPage = () => {
    const [propostas, setPropostas] = useState<any[]>([]);
    const isLoggedIn = sessionStorage.getItem('token');

    useEffect(() => {
        async function fetchPropostas() {
            try {
                const response = await fetch("http://localhost:8080/fabricante/visualizar-propostas", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${isLoggedIn}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPropostas(data);
                } else {
                    console.error("Erro ao buscar propostas:", response.statusText);
                }
            } catch (error: any) {
                console.error("Erro ao buscar propostas:", error.message);
            }
        }

        fetchPropostas();
    }, [isLoggedIn]);

    return (
        <> <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="draft">Draft</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Archived
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filter
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Active
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Archived
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button>
                    <Button size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Product
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Foto</span>
                                    </TableHead>
                                    <TableHead>Modelo</TableHead>
                                    <TableHead className="hidden md:table-cell">Ano</TableHead>
                                    <TableHead className="hidden md:table-cell">Transmissão</TableHead>
                                    <TableHead className="hidden md:table-cell">Potência (cv)</TableHead>
                                    <TableHead className="hidden md:table-cell">Tração</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Data da Proposta</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {propostas.map(proposta => (
                                    <TableRow key={proposta.idProposta}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover border border-dashed"
                                                height="100"
                                                src={`/${proposta.modeloProposto.fotos.split(',')[0].trim()}`}
                                                width="100"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {proposta.modeloProposto.modelo}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {proposta.modeloProposto.ano}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {proposta.modeloProposto.transmissao}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {proposta.modeloProposto.potencia}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {proposta.modeloProposto.traccao}
                                        </TableCell>
                                        <TableCell>
                                            {proposta.estadoProposta === 'Aguardar Revisão' && (
                                                <Badge variant="outline">{proposta.estadoProposta}</Badge>
                                            )}
                                            {proposta.estadoProposta === 'Aprovada' && (
                                                <Badge variant="default">{proposta.estadoProposta}</Badge>
                                            )}
                                            {proposta.estadoProposta === 'Rejeitada' && (
                                                <Badge variant="destructive">{proposta.estadoProposta}</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {proposta.dataProposta}
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Toggle menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Ação</DropdownMenuLabel>
                                                        <DialogTrigger asChild>
                                                            <DropdownMenuItem>Ver Mais</DropdownMenuItem>
                                                        </DialogTrigger>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                                <DialogContent className="rounded max-w-5xl ">
                                                    <DialogHeader>
                                                        <DialogTitle>Detalhes da Proposta</DialogTitle>
                                                        <DialogDescription>
                                                            Aqui estão mais detalhes sobre a proposta.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="grid gap-4">
                                                                <Label htmlFor="modelo">
                                                                    Modelo
                                                                </Label>
                                                                <Input id="modelo" value={proposta.modeloProposto.modelo} />
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="ano">
                                                                        Ano
                                                                    </Label>
                                                                    <Input id="ano" value={proposta.modeloProposto.ano} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="tipoCombustivel">
                                                                        Combustível
                                                                    </Label>
                                                                    <Input id="segmento" value={proposta.modeloProposto.tipoCombustivel} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="potencia">
                                                                        Potência
                                                                    </Label>
                                                                    <Input id="potencia" value={proposta.modeloProposto.potencia} />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="transmissao">
                                                                        Transmissão
                                                                    </Label>
                                                                    <Input id="transmissao" value={proposta.modeloProposto.transmissao} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="caixaVelocidades">
                                                                        Caixa
                                                                    </Label>
                                                                    <Input id="caixaVelocidades" value={proposta.modeloProposto.caixaVelocidades} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="alimentacao">
                                                                        Sobrealimentação
                                                                    </Label>
                                                                    <Input id="alimentacao" value={proposta.modeloProposto.alimentacao} />
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="transmissao">
                                                                        Transmissão
                                                                    </Label>
                                                                    <Input id="transmissao" value={proposta.modeloProposto.traccao} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="quilometragem">
                                                                        Quilometragem
                                                                    </Label>
                                                                    <Input id="quilometragem" value={proposta.modeloProposto.quilometragem} />
                                                                </div>
                                                                <div className="grid items-center gap-4">
                                                                    <Label htmlFor="numeroPortas">
                                                                        Portas
                                                                    </Label>
                                                                    <Input id="numeroPortas" value={proposta.modeloProposto.numeroPortas} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-4">
                                                            <Label htmlFor="descricao">
                                                                Descrição
                                                            </Label>
                                                            <Textarea
                                                                id="descricao"
                                                                value={proposta.modeloProposto.descricao}
                                                                readOnly
                                                                className="min-h-32 w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Save changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
        </>
    );

};

export default PropostaPage;