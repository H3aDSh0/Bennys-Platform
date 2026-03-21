import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Spinner from './spinner';


// Interface para representar o objeto de role do usuário
interface UserRole {
    authority: string;
}

interface AuthorizationProps {
    requiredRoles?: string[]; // Adicionando '?' torna a propriedade opcional
    children: ReactNode;
}

const Authorization: React.FC<AuthorizationProps> = ({ requiredRoles, children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('token');
        const username = sessionStorage.getItem('username');

        console.log(username);

        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        // Fetch para validar o token antes de verificar as roles
        fetch('http://localhost:8080/auth/validateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${isLoggedIn}`, // Adiciona o token JWT como cabeçalho de autorização
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to validate token');
                }
            })
            .catch(error => {
                console.error('Error validating token:', error);
                router.push('/login');
            })

        // Verificar se requiredRoles é definido e não é vazio
        if (requiredRoles && requiredRoles.length > 0) {


            // Obter as roles do usuário e fazer o parsing dos dados
            const userRolesString = sessionStorage.getItem('authorities');
            const userRoles: UserRole[] = userRolesString ? JSON.parse(userRolesString) : [];



            // Verificar se o usuário tem pelo menos uma das roles necessárias
            const hasRequiredRole = requiredRoles.some(role => userRoles.some(userRole => userRole.authority === role));

            if (!hasRequiredRole) {
                router.push('/login');
                return;
            }
        }

        setLoading(false);
    }, [requiredRoles, router]);

    if (loading) {
        return <Spinner />;
    }

    return <>{children}</>;
};

export default Authorization;