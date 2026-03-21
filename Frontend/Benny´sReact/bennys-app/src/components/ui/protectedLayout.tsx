import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('token');
        
        console.log(isLoggedIn);
        setIsAuthenticated(!!isLoggedIn); // Converte o valor em um booleano
        
        if (!isLoggedIn) {
            router.push('/login');
        }
    }, [router]);

    // Se a autenticação ainda não foi verificada, renderize um componente de carregamento
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // Se o usuário não estiver autenticado, redirecione para a página de login
    if (!isAuthenticated) {
        return null; // Ou redirecione aqui também, dependendo do seu requisito
    }

    // Se o usuário estiver autenticado, renderize o conteúdo da página
    return <>{children}</>;
};

export default ProtectedLayout;
