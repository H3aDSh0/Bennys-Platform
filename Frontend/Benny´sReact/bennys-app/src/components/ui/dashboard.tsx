import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
    FilePlus2,
    Plus,
    PackagePlus,
    Archive,
    PackageOpen,
    Warehouse,
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { CustomBreadcrumb } from "./CustomBreadcrumb"
import ProfileSettings from "./profile"
import SettingsPage from "./settings"
import AdicionarPropostaForm from "./AdicionarPropostas"
import PropostaPage from "./Propostas"
import Authorization from "./auth"
import { useRouter } from 'next/navigation';
import PropostaAdminPage from "./PropostasAdmin"
import RegistosFabricantesAdminPage from "./registosFabricantes"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import GaragePage from "./garagem"
import HomePage from "./home"

interface UserRole {
    authority: string;
}

export function DashboardPage() {
    const router = useRouter();
    const [photoUrl, setPhotoUrl] = useState('assets/padraoAvatar.jpg');

    const [selectedItem, setSelectedItem] = useState('home');
    const [showOrdersOptions, setshowOrdersOptions] = useState(false);

    const userRolesString = sessionStorage.getItem('authorities');
    const userRoles: UserRole[] = userRolesString ? JSON.parse(userRolesString) : [];

    const isFabricante = userRoles.some(role => role.authority === 'ROLE_Fabricante');
    const isUtilizador = userRoles.some(role => role.authority === 'ROLE_Utilizador');
    const isAdministrador = userRoles.some(role => role.authority === 'ROLE_Administrador');

    function handleLogout() {
        sessionStorage.clear();
        router.push('/login');
    }


    const handleItemClick = (item: React.SetStateAction<string>) => {
        setSelectedItem(item);
        if (item === 'propostas' || item === 'adicionar-propostas') {
            setshowOrdersOptions(true);
        } else {
            setshowOrdersOptions(false);
        }
    };

    const HomeContent = () => <Authorization><HomePage/></Authorization>;
    const PropostasContent = () => <Authorization requiredRoles={['ROLE_Fabricante']}><PropostaPage /></Authorization>;
    const AdicionarPropostasContent = () => <Authorization requiredRoles={['ROLE_Fabricante']}><AdicionarPropostaForm /></Authorization>;
    const PropostasAdminContent = () => <Authorization requiredRoles={['ROLE_Administrador']}><PropostaAdminPage /></Authorization>;
    const RegistoFabricantesAdminContent = () => <Authorization requiredRoles={['ROLE_Administrador']}><RegistosFabricantesAdminPage /></Authorization>;

    const GaragemContent = () => <Authorization><GaragePage/></Authorization>;
    const SettingsContent = () => <Authorization><SettingsPage /></Authorization>;
    //const VisualizarPropostasContent = () => <PropostaPage />;

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await fetch('http://localhost:8080/account/profile/photo', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.text();
                    if (data) {
                        setPhotoUrl(data);
                    } else {
                        console.log('URL da foto de perfil está vazia.');
                    }
                } else {
                    console.log('Falha ao buscar a foto de perfil');
                }
            } catch (error) {
                console.error('Erro ao buscar a foto de perfil:', error);
            }
        };

        fetchProfilePhoto();
    }, []);

    return (

        <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Image src="/assets/planetaIcon.png" alt="Logo Icon" className=" transition-all group-hover:scale-110" width={0} height={0} sizes="100vw" style={{ width: '20px', height: 'auto' }} />

                        <span className="sr-only">Bennys</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'home' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}

                                    onClick={() => handleItemClick('home')}

                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Home</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'fabricantesAdmin' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                    onClick={() => handleItemClick('fabricantesAdmin')}
                                    style={{ display: isAdministrador ? 'flex' : 'none' }}
                                >
                                    <Truck className="h-5 w-5" />
                                    <span className="sr-only">Fabricantes</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Fabricantes</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'propostasAdmin' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                    onClick={() => handleItemClick('propostasAdmin')}
                                    style={{ display: isAdministrador ? 'flex' : 'none' }}

                                >
                                    <Package className="h-5 w-5" />
                                    <span className="sr-only">Propostas</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Propostas</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'propostas' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                    onClick={() => handleItemClick('propostas')}
                                    style={{ display: isFabricante ? 'flex' : 'none' }}

                                >
                                    <Package className="h-5 w-5" />
                                    <span className="sr-only">Propostas</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Propostas</TooltipContent>
                            {showOrdersOptions && (

                                <ul className="space-y-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href="#"
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'adicionar-propostas' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                                onClick={() => handleItemClick('adicionar-propostas')}
                                            >
                                                <PackagePlus className="h-5 w-5" />
                                                <span className="sr-only">Adicionar Propostas</span>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Adicionar Propostas</TooltipContent>
                                    </Tooltip>
                                </ul>
                            )}

                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'garagem' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                    onClick={() => handleItemClick('garagem')}
                                >
                                    <Warehouse className="h-5 w-5" />
                                    <span className="sr-only">Garagem</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Garagem</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selectedItem === 'settings' ? 'bg-accent text-accent-foreground text-foreground' : ''}`}
                                    onClick={() => handleItemClick('settings')}
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>


            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />

                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Image src="/assets/planetaIcon.png" alt="Logo Icon" className=" transition-all group-hover:scale-110" width={0} height={0} sizes="100vw" style={{ width: '20px', height: 'auto' }} />

                                    <span className="sr-only">Bennys</span>
                                </Link>
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('home')}

                                >
                                    <Home className="h-5 w-5" />
                                    Home
                                </Link>
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'fabricantesAdmin' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('fabricantesAdmin')
                                    }
                                    style={{ display: isAdministrador ? 'flex' : 'none' }}
                                >
                                    <Truck className="h-5 w-5" />
                                    Fabricantes
                                </Link>
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'propostasAdmin' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('propostasAdmin')
                                    }
                                    style={{ display: isAdministrador ? 'flex' : 'none' }}
                                >
                                    <Package className="h-5 w-5" />
                                    Propostas
                                </Link>
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'propostas' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('propostas')
                                    }
                                    style={{ display: isFabricante ? 'flex' : 'none' }}
                                >
                                    <Package className="h-5 w-5" />
                                    Propostas
                                </Link>
                                {showOrdersOptions && (
                                    <ul className="space-y-6"> {/* Adicionando uma borda e cor de fundo diferente */}
                                        <Link
                                            href="#"
                                            className={`flex items-center gap-4 px-2.5 ${selectedItem === 'adicionar-propostas' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            onClick={() => handleItemClick('adicionar-propostas')

                                            }
                                        >
                                            <PackagePlus className="h-5 w-5" />
                                            Adicionar Propostas
                                        </Link>
                                    </ul>
                                )}
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'garagem' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('garagem')

                                    }                                >
                                    <Warehouse className="h-5 w-5" />
                                    Garagem
                                </Link>
                                <Link
                                    href="#"
                                    className={`flex items-center gap-4 px-2.5 ${selectedItem === 'settings' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                    onClick={() => handleItemClick('settings')

                                    }                                >
                                    <Settings className="h-5 w-5" />
                                    Settings
                                </Link>
                            </nav>


                        </SheetContent>
                    </Sheet>
                    <CustomBreadcrumb selectedItem={selectedItem} />

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <Image
                                    src={`/${photoUrl}`}
                                    width={28}
                                    height={28}
                                    alt="Avatar"
                                    className="object-contain w-full h-full rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleItemClick('settings')}>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                { /**/}
                <main className={`grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8  ${selectedItem === 'settings' ? 'space-y-6 p-10 pb-16 md:block' : ''}`}>

                    {selectedItem === 'home' && <HomeContent />}
                    {selectedItem === 'fabricantesAdmin' && <RegistoFabricantesAdminContent />}
                    {selectedItem === 'propostasAdmin' && <PropostasAdminContent />}
                    {selectedItem === 'propostas' && <PropostasContent />}
                    {selectedItem === 'adicionar-propostas' && <AdicionarPropostasContent />}
                    {selectedItem === 'garagem' && <GaragemContent />}
                    {selectedItem === 'settings' && <SettingsContent />}
                </main >
            </div >
        </div >
    )
}
