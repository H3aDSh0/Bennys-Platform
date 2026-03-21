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
import { useCallback, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CirclePlus, X } from 'lucide-react';
import { toast } from "./use-toast"


const PropostaAdminPage = () => {
    const isLoggedIn = sessionStorage.getItem('token');
    const [submitted, setSubmitted] = useState(false); 

    const [propostas, setPropostas] = useState<any[]>([]);
    const [filteredPropostas, setFilteredPropostas] = useState<any[]>([]);
    const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPropostas.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPropostas.length / itemsPerPage);

    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState(false);


    const applyFilter = useCallback(() => {
        if (filtroEstado === 'Todos') {
            setFilteredPropostas(propostas);
        } else {
            const filtered = propostas.filter(proposta => proposta.estadoProposta === filtroEstado);
            setFilteredPropostas(filtered);
        }
    }, [propostas, filtroEstado]);

    useEffect(() => {
        applyFilter();
    }, [propostas, filtroEstado, applyFilter]);


    const handleRowSelect = (idProposta: number) => {
        if (selectedRows.includes(idProposta)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== idProposta));
        } else {
            setSelectedRows([...selectedRows, idProposta]);
        }
    };


    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allIds = currentItems.map(proposta => proposta.idProposta);
            setSelectedRows(allIds);
        }
        setSelectAll(prevSelectAll => !prevSelectAll);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleAprovarPropostas = async () => {
        console.log(selectedRows);
        if (selectedRows.length === 0) {

            toast({
                variant: "destructive",
                description: "Selecione pelo menos uma proposta para aprovar.",
            })
            return;
        }

        try {
            // Enviar solicitação POST para aprovar as propostas selecionadas
            const response = await fetch('http://localhost:8080/admin/fabricantes/propostas/aprovar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isLoggedIn}`, // Certifique-se de ter a variável 'isLoggedIn' definida
                },
                body: JSON.stringify({ propostasIds: selectedRows }), // Enviar IDs das propostas selecionadas no corpo da solicitação
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast({
                    variant: "success",
                    title: "Propostas aprovadas com sucesso.",
                    description: "Propostas selecionados foram aprovadas com sucesso.",
                })
                setSubmitted(true);


            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            // Se ocorrer um erro ao fazer a solicitação, exiba uma mensagem de erro ou realize outra ação necessária
            console.error('Erro ao aprovar propostas:', error.message);

            toast({
                variant: "destructive",
                title: "Erro ao aprovar propostas",
                description: error.message || "Erro desconhecido ao aprovar propostas",
            })
        }

    };

    const handleRejeitarPropostas = async () => {
        console.log(selectedRows);
        if (selectedRows.length === 0) {

            toast({
                variant: "destructive",
                description: "Selecione pelo menos uma proposta para rejeitar.",
            })
            return;
        }

        try {
            // Enviar solicitação POST para aprovar as propostas selecionadas
            const response = await fetch('http://localhost:8080/admin/fabricantes/propostas/rejeitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isLoggedIn}`, // Certifique-se de ter a variável 'isLoggedIn' definida
                },
                body: JSON.stringify({ propostasIds: selectedRows }), // Enviar IDs das propostas selecionadas no corpo da solicitação
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast({
                    variant: "success",
                    title: "Propostas rejeitadas com sucesso.",
                    description: "Propostas selecionados foram rejeitados com sucesso.",
                })
                setSubmitted(true);


            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            // Se ocorrer um erro ao fazer a solicitação, exiba uma mensagem de erro ou realize outra ação necessária
            console.error('Erro ao rejeitar propostas:', error.message);

            toast({
                variant: "destructive",
                title: "Erro ao rejeitar propostas",
                description: error.message || "Erro desconhecido ao rejeitar propostas",
            })
        }

    };

    useEffect(() => {
        async function fetchPropostas() {
            try {
                const response = await fetch("http://localhost:8080/admin/fabricantes/propostas", {
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

    if (submitted) {
        return (
            <PropostaAdminPage />
            
        );
    }

    return (
        <> <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="aprovada">Aprovada</TabsTrigger>
                    <TabsTrigger value="rejeitada">Rejeitada</TabsTrigger>
                    <TabsTrigger value="revisão">Revisão</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-7 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filtro
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'Todos'} onClick={() => setFiltroEstado('Todos')}>
                                Todos
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'Aguardar Revisão'} onClick={() => setFiltroEstado('Aguardar Revisão')}>
                                Revisão
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'Aprovada'} onClick={() => setFiltroEstado('Aprovada')}>
                                Aprovada
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'Rejeitada'} onClick={() => setFiltroEstado('Rejeitada')}>
                                Rejeitada
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1" onClick={handleRejeitarPropostas}>
                        <X className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Rejeitar
                        </span>
                    </Button>
                    <Button size="sm" className="h-7 gap-1" onClick={handleAprovarPropostas}>
                        <CirclePlus className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Aprovar
                        </span>
                    </Button>
                </div>
            </div>
            <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Propostas</CardTitle>
                        <CardDescription>
                            Nesta secção, encontram-se as propostas submetidas pelos fabricantes.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead >
                                        <Checkbox onCheckedChange={handleSelectAll} checked={selectAll} />
                                    </TableHead>

                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Foto</span>
                                    </TableHead>
                                    <TableHead>Modelo</TableHead>
                                    <TableHead>Fabricante</TableHead>
                                    <TableHead className="hidden md:table-cell">País</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Data da Proposta</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="font-medium">Não há propostas disponíveis.</TableCell>
                                    </TableRow>
                                ) : (
                                    currentItems.map(proposta => (
                                        <TableRow key={proposta.idProposta}>
                                            <TableCell >

                                                <Checkbox checked={selectedRows.includes(proposta.idProposta)}
                                                    onCheckedChange={() => handleRowSelect(proposta.idProposta)} />

                                            </TableCell>
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
                                            <TableCell className="font-medium">
                                                {proposta.fabricante.nome}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {proposta.fabricante.pais}
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
                                                {new Date(proposta.dataProposta).toLocaleDateString('pt-PT', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
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
                                                                    <Input id="modelo" readOnly defaultValue={proposta.modeloProposto.modelo} />
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="ano">
                                                                            Ano
                                                                        </Label>
                                                                        <Input id="ano" readOnly defaultValue={proposta.modeloProposto.ano} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="tipoCombustivel">
                                                                            Combustível
                                                                        </Label>
                                                                        <Input id="segmento" readOnly defaultValue={proposta.modeloProposto.tipoCombustivel} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="potencia">
                                                                            Potência
                                                                        </Label>
                                                                        <Input id="potencia" readOnly defaultValue={proposta.modeloProposto.potencia} />
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="transmissao">
                                                                            Transmissão
                                                                        </Label>
                                                                        <Input id="transmissao" readOnly defaultValue={proposta.modeloProposto.transmissao} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="caixaVelocidades">
                                                                            Caixa
                                                                        </Label>
                                                                        <Input id="caixaVelocidades" readOnly defaultValue={proposta.modeloProposto.caixaVelocidades} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="alimentacao">
                                                                            Sobrealimentação
                                                                        </Label>
                                                                        <Input id="alimentacao" readOnly defaultValue={proposta.modeloProposto.alimentacao} />
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className=" items-center gap-4 hidden sm:grid">
                                                                        <Label htmlFor="transmissao">
                                                                            Tração
                                                                        </Label>
                                                                        <Input id="transmissao" readOnly defaultValue={proposta.modeloProposto.traccao} />
                                                                    </div>
                                                                    <div className=" items-center gap-4 hidden sm:grid">
                                                                        <Label htmlFor="quilometragem">
                                                                            Quilometragem
                                                                        </Label>
                                                                        <Input id="quilometragem" readOnly defaultValue={proposta.modeloProposto.quilometragem} />
                                                                    </div>
                                                                    <div className=" items-center gap-4 hidden sm:grid">
                                                                        <Label htmlFor="numeroPortas">
                                                                            Portas
                                                                        </Label>
                                                                        <Input id="numeroPortas" readOnly defaultValue={proposta.modeloProposto.numeroPortas} />
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
                                                                    className="min-h-24 w-full"
                                                                />
                                                            </div>
                                                            <div className="gap-4  hidden sm:flex ">
                                                                {proposta.modeloProposto.fotos.split(',').map((foto: string, index: number) => (
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
                                            </TableCell>
                                        </TableRow>
                                    ))

                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        {currentItems.length === 0 ? (
                            <div className="text-xs text-muted-foreground">Não há propostas disponíveis.</div>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div className="text-xs text-muted-foreground">
                                    Mostrar <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredPropostas.length)}</strong> de <strong>{filteredPropostas.length}</strong> propostas
                                </div>
                                <div className="flex  justify-end space-x-2 ">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
        </>
    );

};

export default PropostaAdminPage;