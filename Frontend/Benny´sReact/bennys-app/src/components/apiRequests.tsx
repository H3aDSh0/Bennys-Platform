import { toast } from "./ui/use-toast";

export interface UserProfile {
    nome: string;
    email: string;
    numeroTelemovel: string;
    cc?: string;
    nif?: string;
    dataNascimento?: string;
    morada?: string;
    password: string;
    fotoPerfil: string;
    sede?: string;
    pais?: string;
    descricao?: string;
    portfolioVeiculos?: string;
    cargo?: string;
    documentacaoCertificacao?: string;
}

export interface UserProfileUpdate {
    nome?: string;
    numeroTelemovel?: string;
    dataNascimento?: string;
    morada?: string;
    fotoPerfil?: string;
    sede?: string;
    pais?: string;
    descricao?: string;
    portfolioVeiculos?: string;
    documentacaoCertificacao?: string;
}


const apiUrl = 'http://localhost:8080'; // Definindo o URL base da API

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
    const profileUrl = `${apiUrl}/account/profile`; // Construindo a URL para buscar o perfil do utilizador

    try {
        const response = await fetch(profileUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar perfil do utilizador: ${response.statusText}`);
        }

        const profile: UserProfile = await response.json();
        return profile;
    } catch (error) {
        throw new Error('Erro ao buscar perfil do utilizador: ' + error);
    }
};

// Função para atualizar o perfil do utilizador
export const updateProfile = async (token: string, updates: UserProfileUpdate): Promise<void> => {
    const updateUrl = `${apiUrl}/account/profile/update`;

    try {
        const response = await fetch(updateUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });

        if (!response.ok) {
            return response.text().then(errorMessage => {
                throw new Error(errorMessage);
            });
        }
        const data = await response.text();
        console.log(data);
    } catch (error) {
        throw new Error('Erro ao atualizar perfil do utilizador: ' + error);
    }
};


