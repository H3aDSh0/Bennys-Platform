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


const RegistosFabricantesAdminPage = () => {
    const isLoggedIn = sessionStorage.getItem('token');
    const [submitted, setSubmitted] = useState(false); 

    const [registos, setRegisto] = useState<any[]>([]);
    const [filteredRegistos, setFilteredRegistos] = useState<any[]>([]);
    const [filtroEstado, setFiltroEstado] = useState<string>('Todos');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRegistos.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredRegistos.length / itemsPerPage);

    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectAll, setSelectAll] = useState(false);




    const applyFilter = useCallback(() => {
        if (filtroEstado === 'Todos') {
            setFilteredRegistos(registos);
        } else {
            const filtered = registos.filter(registos => registos.status === filtroEstado);
            setFilteredRegistos(filtered);
        }
    }, [registos, filtroEstado]);

    useEffect(() => {
        applyFilter();
    }, [registos, filtroEstado, applyFilter]);


    const handleRowSelect = (id: number) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter(rowId => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };


    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
        } else {
            const allIds = currentItems.map(registos => registos.id);
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
                description: "Selecione pelo menos uma fabricante para aprovar.",
            })
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/admin/fabricantes/aprovar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isLoggedIn}`,
                },
                body: JSON.stringify({ fabricanteIds: selectedRows }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast({
                    variant: "success",
                    title: "Registo dos fabricantes aprovados com sucesso.",
                    description: "Os fabricantes selecionados foram aprovados com sucesso.",
                })
                setSubmitted(true);

            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao aprovar registo:', error.message);

            toast({
                variant: "destructive",
                title: "Erro ao aprovar registos",
                description: error.message || "Erro desconhecido ao aprovar registos",
            })
        }

    };

    const handleRejeitarPropostas = async () => {
        console.log(selectedRows);
        if (selectedRows.length === 0) {

            toast({
                variant: "destructive",
                description: "Selecione pelo menos uma fabricante para rejeitar.",
            })
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/admin/fabricantes/rejeitar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${isLoggedIn}`,
                },
                body: JSON.stringify({ fabricanteIds: selectedRows }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast({
                    variant: "success",
                    title: "Registos rejeitados com sucesso.",
                    description: "Os fabricantes selecionados foram rejeitados com sucesso.",
                })
                setSubmitted(true);


            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error('Erro ao rejeitar registos:', error.message);

            toast({
                variant: "destructive",
                title: "Erro ao rejeitar registos",
                description: error.message || "Erro desconhecido ao rejeitar registos",
            })
        }

    };

    useEffect(() => {
        async function fetchRegistos() {
            try {
                const response = await fetch("http://localhost:8080/admin/fabricantes/pendentes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${isLoggedIn}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    //console.log(data);
                    setRegisto(data);
                } else {
                    console.error("Erro ao buscar registos:", response.statusText);
                }
            } catch (error: any) {
                console.error("Erro ao buscar registos:", error.message);
            }
        }

        fetchRegistos();
    }, [isLoggedIn]);

    if (submitted) {
        return (
            <RegistosFabricantesAdminPage />
            
        );
    }

    return (
        <> <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="Pendente">Pendente</TabsTrigger>
                    <TabsTrigger value="Aprovado">Aprovado</TabsTrigger>
                    <TabsTrigger value="Rejeitado">Rejeitado</TabsTrigger>
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
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'PENDENTE'} onClick={() => setFiltroEstado('PENDENTE')}>
                                Pendente
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'APROVADO'} onClick={() => setFiltroEstado('APROVADO')}>
                                Aprovado
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked={filtroEstado === 'REJEITADO'} onClick={() => setFiltroEstado('REJEITADO')}>
                                Rejeitado
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
                        <CardTitle>Registo dos Fabricantes</CardTitle>
                        <CardDescription>
                            Nesta secção, pode visualizar, aprovar ou rejeitar os registos dos fabricantes e consultar os detalhes sobre cada fabricante.
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
                                    <TableHead>Fabricante</TableHead>
                                    <TableHead>Pais</TableHead>
                                    <TableHead className="hidden md:table-cell">Portfólio</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Data de Registo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="font-medium">Não há registos disponíveis.</TableCell>
                                    </TableRow>
                                ) : (
                                    currentItems.map(registo => (
                                        <TableRow key={registo.id}>
                                            <TableCell >

                                                <Checkbox checked={selectedRows.includes(registo.id)}
                                                    onCheckedChange={() => handleRowSelect(registo.id)} />

                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">

                                                <Image
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover border border-dashed"
                                                    height="40"
                                                    src={`/${registo.fotoPerfil}`}
                                                    width="40"
                                                    style={{ objectFit: 'contain' }}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {registo.nome}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {registo.pais}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {registo.portfolioVeiculos}
                                            </TableCell>
                                            <TableCell>
                                                {registo.status === 'PENDENTE' && (
                                                    <Badge variant="outline">{registo.status}</Badge>
                                                )}
                                                {registo.status === 'APROVADO' && (
                                                    <Badge variant="default">{registo.status}</Badge>
                                                )}
                                                {registo.status === 'REJEITADO' && (
                                                    <Badge variant="destructive">{registo.status}</Badge>
                                                )}
                                            </TableCell>
                                            <td className="hidden md:table-cell">
                                                {new Date(registo.dataRegisto).toLocaleDateString('pt-PT', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
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
                                                            <DialogTitle>Detalhes do Fabricante</DialogTitle>
                                                            <DialogDescription>
                                                                Aqui estão mais detalhes sobre o fabricante.
                                                            </DialogDescription>
                                                        </DialogHeader>


                                                        <div className="grid gap-4 py-4">
                                                            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
                                                                <div className="grid gap-4">
                                                                    <Label htmlFor="nome">
                                                                        Nome
                                                                    </Label>
                                                                    <Input id="nome" readOnly defaultValue={registo.nome} />
                                                                </div>
                                                                <div className="grid gap-4">
                                                                    <Label htmlFor="email">
                                                                        Email
                                                                    </Label>
                                                                    <Input id="email" readOnly defaultValue={registo.email} />
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-4">
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="numeroTelemovel">
                                                                            Número de Telemóvel
                                                                        </Label>
                                                                        <Input id="numeroTelemovel" readOnly defaultValue={registo.numeroTelemovel} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="sede">
                                                                            Sede
                                                                        </Label>
                                                                        <Input id="sede" readOnly defaultValue={registo.sede} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="pais">
                                                                            País
                                                                        </Label>
                                                                        <Input id="pais" readOnly defaultValue={registo.pais} />
                                                                    </div>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="portfolioVeiculos">
                                                                            Portfólio
                                                                        </Label>
                                                                        <Input id="portfolioVeiculos" readOnly defaultValue={registo.portfolioVeiculos} />
                                                                    </div>
                                                                    <div className="grid items-center gap-4">
                                                                        <Label htmlFor="documentacaoCertificacao">
                                                                            Certificação
                                                                        </Label>
                                                                        <Input id="documentacaoCertificacao" readOnly defaultValue={registo.documentacaoCertificacao} />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div className="grid gap-4">
                                                                <Label htmlFor="descricao">
                                                                    Descrição
                                                                </Label>
                                                                <Textarea
                                                                    id="descricao"
                                                                    value={registo.descricao}
                                                                    readOnly
                                                                    className="min-h-24 w-full"
                                                                />
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
                            <div className="text-xs text-muted-foreground">Não há registos disponíveis.</div>
                        ) : (
                            <div className="flex justify-between items-center w-full">
                                <div className="text-xs text-muted-foreground">
                                    Mostrar <strong>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredRegistos.length)}</strong> de <strong>{filteredRegistos.length}</strong> registos
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

export default RegistosFabricantesAdminPage;