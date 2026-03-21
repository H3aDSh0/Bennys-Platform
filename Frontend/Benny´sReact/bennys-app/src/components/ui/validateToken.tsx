import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './spinner'; 
import { toast } from './use-toast';

interface ValidateTokenProps {
    children: React.ReactNode; 
}
const ValidateToken: React.FC<ValidateTokenProps> = ({ children }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        console.log(token);
        
        if (!token) {
   
            router.push('/login');
            return;
        }

        // Fetch para validar o token
        fetch('http://localhost:8080/auth/validateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
            .then(response => {
                if (response.ok) {
                    setLoading(false);
                } else {
                    throw new Error('Failed to validate token');
                }
            })
            .catch(error => {
                console.error('Error validating token:', error);
                toast({
                    variant: "destructive",
                    title: "Falha ao validar token",
                    description: error.message || "Erro desconhecido durante validação do token",
                });  
                router.push('/login'); 
            });

    }, [router]);

    if (loading) {
        return <Spinner />; 
    }

    return <>{children}</>; 
};

export default ValidateToken;
