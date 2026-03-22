# Benny's Platform  

> **Projeto de Aptidão Profissional (PAP) | Classificação Final: 20/20**

Bem-vindo à **Benny’s Platform** — uma aplicação Full-Stack desenvolvida com o objetivo de criar um marketplace automóvel completo, permitindo a compra, venda e gestão de veículos de forma centralizada, intuitiva e segura.

---

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![SQL Server](https://img.shields.io/badge/MSSQL-2019-red?style=flat-square&logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## Contexto Académico

Este projeto foi desenvolvido no âmbito da **Prova de Aptidão Profissional (PAP)** do curso de  
**Técnico de Gestão e Programação de Sistemas Informáticos**, na **Escola Secundária António Damásio** (2023/2024).

A PAP incluiu:
- Desenvolvimento completo da aplicação  
- Elaboração do relatório técnico  
- Apresentação e defesa perante júri  

Obtive a **classificação final de 20 valores**, refletindo o rigor, a complexidade técnica e a qualidade global da solução.  
Este projeto corresponde à qualificação de **Nível IV do Quadro Nacional de Qualificações**.

---

## Tecnologias Utilizadas

A plataforma foi construída com uma stack moderna, focada em desempenho, escalabilidade e segurança:

### Frontend
- Next.js 14  
- TypeScript  
- Tailwind CSS  
- Shadcn/UI  
- Framer Motion  

### Backend
- Java 17  
- Spring Boot 3  
- Spring Data JPA  

### Base de Dados
- Microsoft SQL Server (MSSQL)  

### Segurança
- Autenticação com JWT  
- Sistema de Magic Links  
- Controlo de acessos (RBAC)  

---

## Funcionalidades Principais

### Gestão de Utilizadores
- Registo e autenticação de utilizadores  
- Diferentes perfis: utilizador, fabricante (partner) e administrador  
- Gestão e atualização de conta  

### Marketplace Automóvel
- Pesquisa avançada com filtros (segmento, combustível, potência, tração)  
- Compra e aluguer de veículos  
- Visualização detalhada de veículos  

### Área de Fabricantes
- Submissão de veículos para a plataforma  
- Sistema de aprovação por administrador  
- Gestão de inventário  

### Gestão e Histórico
- Histórico de veículos (manutenção, seguro, registos relevantes)  
- Área pessoal para gestão de veículos  

### Interação e Suporte
- Sistema de avaliações e comentários  
- Canal de suporte integrado  

---

## Demonstração da Interface

<div align="center">

  <img src="https://github.com/user-attachments/assets/141aa144-2ed3-4309-84ac-96f6dab2d39c" width="48%" />
  <p><i>Autenticação e gestão de perfil.</i></p>
  
  <br>
  
  <img src="https://github.com/user-attachments/assets/85d304cd-b6c3-4e15-b13d-71d52b43aca1" width="48%" />
  <img src="https://github.com/user-attachments/assets/11e3d076-58de-4373-9971-d585145d46f3" width="48%" />
  <p><i>Gestão de propostas e painel administrativo.</i></p>

  <br>

  <img src="https://github.com/user-attachments/assets/3fd68e01-e278-4687-a4e3-00e561980a69" width="75%" />
  <p><i>Marketplace com visualização de veículos.</i></p>
  
</div>

---

## Documentação

Na raiz do projeto:

- [`Relatorio_Tecnico_PAP.pdf`](./Relatorio_Tecnico_PAP.pdf)  
  Arquitetura, análise de sistemas e implementação  

- [`Manual_de_Utilizador.pdf`](./Manual_de_Utilizador.pdf)  
  Guia de utilização da plataforma  

---

## Instalação

### Pré-requisitos
- Java JDK 17  
- Node.js 18+  
- Microsoft SQL Server  

### 1. Base de Dados
Executar o script:

```bash
DB/CreateBennysDB.sql
```

### 2. Backend

```bash
cd Backend/Bennys
./mvnw spring-boot:run
```

### 3. Frontend

```bash
cd "Frontend/Benny´sReact/bennys-app"
npm install
npm run dev
```

---

> [!TIP]
> Este projeto encontra-se funcional e completo no contexto da PAP (20/20). No entanto, ainda não está finalizado.
