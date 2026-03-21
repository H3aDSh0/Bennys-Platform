/* CREATES */

/*create database BennysDB*/

use BennysDB

/*Utilizador (#ID Utilizador, Nome, E-mail, Nº de Telemóvel, CC, NIF, Data de Nascimento, Morada, Password, Foto_Perfil, Data de Registo)*/

CREATE TABLE Utilizador (
    ID_Utilizador INT IDENTITY(100,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Numero_Telemovel NVARCHAR(9) UNIQUE NULL,
    CC NVARCHAR(8) UNIQUE NOT NULL,
    NIF NVARCHAR(9) UNIQUE NOT NULL,
    Data_Nascimento DATE NOT NULL,
    Morada NVARCHAR(255) NOT NULL,
    Password NVARCHAR(MAX) NOT NULL,
	Foto_Perfil NVARCHAR(255) NULL,
	Role NVARCHAR(50) NOT NULL DEFAULT 'Utilizador', 
    Data_Registo DATETIME NOT NULL
);

/*Fabricante (#ID Fabricante, Nome, E-mail, Nº de Telemóvel, Palavra-Passe, NIF, Sede, País, 
Portfólio de Veículos, Documentação de Certificação, Foto_Perfil, Data de Registo)*/

CREATE TABLE Fabricante (
    ID_Fabricante INT IDENTITY(500,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Numero_Telemovel NVARCHAR(9) UNIQUE NOT NULL,
    Password NVARCHAR(MAX) NOT NULL,
    NIF NVARCHAR(9) UNIQUE NOT NULL,
    Sede NVARCHAR(100) NOT NULL,
    Pais NVARCHAR(50) NOT NULL,
    Portfolio_Veiculos NVARCHAR(MAX),
    Documentacao_Certificacao NVARCHAR(MAX),
	Foto_Perfil NVARCHAR(255) NOT NULL,
	Role NVARCHAR(50) NOT NULL DEFAULT 'Fabricante',
    Descricao NVARCHAR(MAX),
    status NVARCHAR(30) NOT NULL CHECK (status IN ('PENDENTE', 'APROVADO', 'REJEITADO')) DEFAULT 'PENDENTE',
    Data_Registo DATETIME NOT NULL
);

/*Administrador (#ID Administrador, Nome, E-mail, Nº de Telemóvel, Palavra-Passe, CC, Cargo, Foto_Perfil)*/

CREATE TABLE Administrador (
    ID_Administrador INT IDENTITY(900,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Numero_Telemovel NVARCHAR(9) UNIQUE NOT NULL,
    Password NVARCHAR(MAX) NOT NULL,
    CC NVARCHAR(8) UNIQUE NOT NULL,
    Cargo NVARCHAR(100) NOT NULL,
	Foto_Perfil NVARCHAR(255) NULL,
	Role NVARCHAR(50) NOT NULL DEFAULT 'Administrador',
	Data_Registo DATETIME NOT NULL
);



/*Veículo (#ID Veículo, ID Fabricante, Modelo, Ano, Segmento, Tipo Combustível, Potência, Transmissão, Caixa_Velocidades, 
Alimentação, Tracção, Quilometragem, Numero_Portas, Condição, Descrição)*/

CREATE TABLE Veiculo (
    ID_Veiculo INT IDENTITY(1,1) PRIMARY KEY,
    ID_Fabricante INT NOT NULL,
	Email_Proprietario NVARCHAR(100) NULL,
    Modelo NVARCHAR(100) NOT NULL,
    Ano INT NOT NULL,
    Segmento NVARCHAR(30) NOT NULL,
    Tipo_Combustivel NVARCHAR(30) NOT NULL CHECK (Tipo_Combustivel IN ('Gasolina', 'Gasóleo', 'Elétrico', 'Híbrido')),
    Potencia INT NOT NULL,
    Transmissao NVARCHAR(50) NOT NULL,
	Caixa_Velocidades INT  NULL,
	Alimentacao NVARCHAR(50) NOT NULL,
	Traccao NVARCHAR(3) NOT NULL CHECK (Traccao IN ('4WD', 'AWD', 'FWD', 'RWD')),	
    Quilometragem DECIMAL(10,2) NOT NULL,
	Numero_Portas INT NOT NULL,
    Condicao NVARCHAR(50) NOT NULL,
    Descricao NVARCHAR(MAX) NOT NULL,
    Fotos NVARCHAR(MAX) NOT NULL,
	CHECK (Ano > 0 AND Potencia > 0 AND Quilometragem >= 0 AND Numero_Portas > 0),
    FOREIGN KEY (ID_Fabricante) REFERENCES Fabricante(ID_Fabricante) On UPDATE CASCADE,
	FOREIGN KEY (Email_Proprietario) REFERENCES Utilizador(Email) ON DELETE CASCADE
);

/*Proposta de Adição (#ID Proposta, ID Fabricante, Nome Fabricante, Data da Proposta, EstadoProposta)*/

CREATE TABLE Proposta_Adicao (
    ID_Proposta INT IDENTITY(1,1) PRIMARY KEY,
    ID_Fabricante INT NOT NULL,
    Nome_Fabricante NVARCHAR(100) NOT NULL,
    Data_Proposta DATE NOT NULL,
    Estado_Proposta NVARCHAR(30) NOT NULL CHECK (Estado_Proposta IN ('Aguardar Revisão', 'Aprovada', 'Rejeitada')) DEFAULT 'Aguardar Revisão',
    FOREIGN KEY (ID_Fabricante) REFERENCES Fabricante(ID_Fabricante) On UPDATE CASCADE ON DELETE CASCADE
);

/*•	ModeloProposta(#ID Modelo, Modelo, Ano, Segmento, Tipo Combustível, Potência, Transmissão, Caixa_Velocidades, Alimentação, Tracção, 
Quilometragem, Numero_Portas, Condição, Descrição)*/

CREATE TABLE Modelo_Proposta (
    ID_Modelo INT IDENTITY(1,1) PRIMARY KEY,
    Modelo NVARCHAR(100) NOT NULL,
    Ano INT NOT NULL,
    Segmento NVARCHAR(30) NOT NULL,
    Tipo_Combustivel NVARCHAR(30) NOT NULL CHECK (Tipo_Combustivel IN ('Gasolina', 'Gasóleo', 'Elétrico', 'Híbrido')),
    Potencia INT NOT NULL,
    Transmissao NVARCHAR(50) NOT NULL,
	Caixa_Velocidades INT  NULL,
	Alimentacao NVARCHAR(50) NOT NULL,
	Traccao NVARCHAR(3) NOT NULL CHECK (Traccao IN ('4WD', 'AWD', 'FWD', 'RWD')),	
    Quilometragem DECIMAL(10,2) NOT NULL,
	Numero_Portas INT NOT NULL,
    Condicao NVARCHAR(50) NOT NULL,
    Descricao NVARCHAR(MAX) NOT NULL,
    Fotos NVARCHAR(MAX) NOT NULL,
	CHECK (Ano > 0 AND Potencia > 0 AND Quilometragem >= 0 AND Numero_Portas > 0),
);

/*DetalhesVeículos(#ID Detalhes, ID Proposta, ID Modelo)*/

CREATE TABLE Detalhes_Veiculos (
    ID_Detalhes INT IDENTITY(1,1) PRIMARY KEY,
    ID_Proposta INT NOT NULL,
    ID_Modelo INT NOT NULL,
    FOREIGN KEY (ID_Proposta) REFERENCES Proposta_Adicao(ID_Proposta) On UPDATE CASCADE,
    FOREIGN KEY (ID_Modelo) REFERENCES Modelo_Proposta(ID_Modelo) On UPDATE CASCADE
);

/*DisponibilidadeVeículo(#ID Disponibilidade, ID Veículo, Tipo de Operação, Preço de Venda, Preço de Aluguel por Dia, 
Disponibilidade)*/

CREATE TABLE Disponibilidade_Veiculo (
    ID_Disponibilidade INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    Tipo_Operacao NVARCHAR(50) NOT NULL CHECK (Tipo_Operacao IN ('Venda', 'Aluguel', 'Ambos')),
    Preco_Venda DECIMAL(10, 2) NULL,
    Preco_Aluguel_Dia DECIMAL(10, 2) NULL,
    Disponibilidade NVARCHAR(30) NOT NULL CHECK (Disponibilidade IN ('Disponível', 'Indisponível')),
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) On UPDATE CASCADE ON DELETE CASCADE
);

/*Sistema de Pagamento(#ID Pagamento, Método de Pagamento, ValorTotal, Data e Hora, Estado do Pagamento)*/

CREATE TABLE Sistema_Pagamento (
    ID_Pagamento INT IDENTITY(1,1) PRIMARY KEY,
    MetodoPagamento NVARCHAR(50) NOT NULL,
    ValorTotal DECIMAL(10, 2) NOT NULL,
    DataHora DATETIME NOT NULL,
    EstadoPagamento NVARCHAR(30) NOT NULL CHECK (EstadoPagamento IN ('Pendente', 'Aprovado','Rejeitado')) DEFAULT 'Pendente' ,
);

/*Transação(#ID Transação, ID Comprador, ID Vendedor, ID Veículo, ID Pagamento, Tipo de Operação, Duração do Aluguel, Data de Término do Aluguel, Data da Transacão, Valor Total)*/

CREATE TABLE Transacao (
    ID_Transacao INT IDENTITY(1,1) PRIMARY KEY,
    ID_Comprador INT NOT NULL,
    ID_Vendedor_Utilizador INT NULL,
    ID_Vendedor_Fabricante INT NULL,
    ID_Veiculo INT NOT NULL,
    ID_Pagamento INT NOT NULL,
    Tipo_Operacao NVARCHAR(50) NOT NULL,
    Duracao_Aluguel INT NULL,
    Data_Termino_Aluguel DATETIME NULL,
    Data_Transacao DATETIME NOT NULL,
    Valor_Total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Comprador) REFERENCES Utilizador(ID_Utilizador) On UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) On UPDATE CASCADE,
    FOREIGN KEY (ID_Pagamento) REFERENCES Sistema_Pagamento(ID_Pagamento) On UPDATE CASCADE,
    FOREIGN KEY (ID_Vendedor_Utilizador) REFERENCES Utilizador(ID_Utilizador) ,
    FOREIGN KEY (ID_Vendedor_Fabricante) REFERENCES Fabricante(ID_Fabricante) 
);

/*Avaliação(#ID Avaliação, ID Veículo, ID Utilizador, Classificação, Comentário, Data da Avaliação)*/

CREATE TABLE Avaliacao (
    ID_Avaliacao INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    ID_Utilizador INT NOT NULL,
    Classificacao INT NOT NULL CHECK (Classificacao >= 1 AND Classificacao <= 5), 
    Comentario NVARCHAR(255) NULL,
    Data_Avaliacao DATE NOT NULL,
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) On UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (ID_Utilizador) REFERENCES Utilizador(ID_Utilizador) On UPDATE CASCADE
);

/*Equipa de Suporte(#ID Membro, Nome, Cargo, E-mail, Nº de Telemóvel, Data de Admissão) */

CREATE TABLE Equipa_Suporte (
    ID_Membro INT IDENTITY(300,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Cargo NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Numero_Telemovel NVARCHAR(9) UNIQUE NULL,
    DataAdmissao DATE
);

/*Suporte(#ID Suporte, ID Utilizador, ID Fabricante, ID Veículo, Assunto, Descrição, Estado, Data da Solicitação)*/

CREATE TABLE Suporte (
    ID_Suporte INT IDENTITY(1,1) PRIMARY KEY,
    ID_Utilizador INT NULL,
    ID_Fabricante INT NULL,
    ID_Veiculo INT NULL,
    ID_EquipaSuporte INT NULL,
    Assunto NVARCHAR(255) NOT NULL,
    Descricao NVARCHAR(1000) NOT NULL,
    Estado NVARCHAR(30) NOT NULL CHECK (Estado IN ('Pendente', 'Em Analise','Resolvido')) DEFAULT 'Pendente',
    DataSolicitacao DATE NOT NULL,
    FOREIGN KEY (ID_Utilizador) REFERENCES Utilizador(ID_Utilizador) ON UPDATE CASCADE,
    FOREIGN KEY (ID_Fabricante) REFERENCES Fabricante(ID_Fabricante),
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) ON UPDATE CASCADE,
    FOREIGN KEY (ID_EquipaSuporte) REFERENCES Equipa_Suporte(ID_Membro)  ON UPDATE CASCADE
);

/*Plano Mensal(#ID Plano, Nome do Plano, Descrição, Preço Mensal, Duração)*/

CREATE TABLE Plano_Mensal (
    ID_Plano INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Plano NVARCHAR(50) UNIQUE NOT NULL,
    Descricao NVARCHAR(MAX) NULL,
    Preco_Mensal DECIMAL(10, 2) NOT NULL,
    Duracao INT NOT NULL CHECK (Duracao > 0) 
);

/*AssociaçãoPlanosVeículo(#ID Associação, ID Veículo, ID Plano, Tipo de Veículos)*/

CREATE TABLE Associacao_Planos_Veiculo (
    ID_Associacao INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    ID_Plano INT NOT NULL,
    Tipo_Veiculos NVARCHAR(100) NOT NULL,
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (ID_Plano) REFERENCES Plano_Mensal(ID_Plano) ON DELETE CASCADE ON UPDATE CASCADE
);


/*Manutenção(#ID Manutenção, ID Veículo, Tipo de Manutenção, Descrição, Data e Hora, Custo, Estado da Manutenção) */

CREATE TABLE Manutencao (
    ID_Manutencao INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    Tipo_Manutencao NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(MAX) NOT NULL,
    Data_Hora DATETIME NOT NULL,
    Custo DECIMAL(10, 2) NOT NULL,
    Estado_Manutencao NVARCHAR(30) NOT NULL CHECK (Estado_Manutencao IN ('Pendente', 'Concluida')) DEFAULT 'Pendente',
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) ON DELETE CASCADE
);

/*Seguro(#ID Seguro, ID Veículo, Seguradora, Data de Início, Data de Término, Coberturas, Valor do Prémio, Estado do Seguro)*/

CREATE TABLE Seguro (
    ID_Seguro INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    Seguradora NVARCHAR(100) NOT NULL,
    Data_Inicio DATE NOT NULL,
    Data_Termino DATE NOT NULL,
    Coberturas NVARCHAR(MAX) NOT NULL,
    Valor_Premio DECIMAL(10, 2) NOT NULL,
    Estado_Seguro NVARCHAR(30) NOT NULL CHECK (Estado_Seguro IN ('Ativo', 'Inativo','Vencido')),
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) ON DELETE CASCADE
);


/*Acidente(#ID Acidente, ID Veículo, Data e Hora do Acidente, Local do Acidente, Descrição do Acidente, Danos no Veículo, 
Envolvidos) */

CREATE TABLE Acidente (
    ID_Acidente INT IDENTITY(1,1) PRIMARY KEY,
    ID_Veiculo INT NOT NULL,
    Data_Hora_Acidente DATETIME NOT NULL,
    Local_Acidente NVARCHAR(100) NOT NULL,
    Descricao_Acidente NVARCHAR(MAX) NOT NULL,
    Danos_Veiculo NVARCHAR(MAX) NOT NULL,
    Envolvidos NVARCHAR(MAX) NULL,
    FOREIGN KEY (ID_Veiculo) REFERENCES Veiculo(ID_Veiculo) ON DELETE CASCADE
);

/*
// Apagar Tabelas //
DROP TABLE IF EXISTS Acidente;
DROP TABLE IF EXISTS Seguro;
DROP TABLE IF EXISTS Manutencao;
DROP TABLE IF EXISTS Associacao_Planos_Veiculo;
DROP TABLE IF EXISTS Plano_Mensal;
DROP TABLE IF EXISTS Suporte;
DROP TABLE IF EXISTS Equipa_Suporte;
DROP TABLE IF EXISTS Avaliacao;
DROP TABLE IF EXISTS Transacao;
DROP TABLE IF EXISTS Sistema_Pagamento;
DROP TABLE IF EXISTS Disponibilidade_Veiculo;
DROP TABLE IF EXISTS Detalhes_Veiculos;
DROP TABLE IF EXISTS Modelo_Proposta;
DROP TABLE IF EXISTS Proposta_Adicao;
DROP TABLE IF EXISTS Veiculo;
DROP TABLE IF EXISTS Administrador;
DROP TABLE IF EXISTS Fabricante;
DROP TABLE IF EXISTS Utilizador;
*/
