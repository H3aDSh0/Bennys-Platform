import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from './use-toast';

interface ValidateMagicLinkProps {
    children: React.ReactNode;
}

const ValidateMagicLink: React.FC<ValidateMagicLinkProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenMagicLink = params.get('token');

        if (!tokenMagicLink) {
            router.push('/login');
            return;
        }

        fetch('http://localhost:8080/auth/validateMagicLink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenMagicLink}`,
            },
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('authorities', JSON.stringify(data.authorities));

                toast({
                    variant: "success",
                    title: "Login bem-sucedido",
                    description: "Bem-vindo de volta!",
                })

                router.push('/dashboard');
            })
            .catch(error => {
                console.error('Erro ao validar token:', error);
                toast({
                    variant: "destructive",
                    title: "Falha ao validar token",
                    description:  "Token inválido",
                });
                router.push('/login');
            });
    }, [router]);

    return <>{children}</>;
};

export default ValidateMagicLink;
