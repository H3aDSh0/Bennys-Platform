# Benny's Platform 

> **Projeto de Aptidão Profissional (PAP) | Classificação Final: 20/20**
> 
> Bem-vindo à **Benny's Platform**. Desenvolvi esta solução Full-Stack para te oferecer um marketplace automóvel completo, onde podes centralizar a compra, venda e gestão de veículos numa experiência intuitiva, robusta e segura.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![SQL Server](https://img.shields.io/badge/MSSQL-2019-red?style=flat-square&logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## Contexto Académico

Este projeto marca a conclusão do curso **Técnico de Gestão e Programação de Sistemas Informáticos** na **Escola Secundária António Damásio** (Ano Letivo 2023/2024). 

A **Prova de Aptidão Profissional (PAP)** — que englobou o desenvolvimento da plataforma, a redação do relatório técnico e a respetiva apresentação e defesa perante o júri — obtive a **classificação final de 20 valores**. Este resultado reflete o rigor técnico e a complexidade de todo o ecossistema aqui apresentado, representando a minha qualificação de **Nível IV** do Quadro Nacional de Qualificações.

---

## O que Vais Encontrar "Debaixo do Capot"

Para garantir que a plataforma é escalável e segura, utilizei tecnologias de referência no mercado que podes explorar diretamente no código:

* **Interface Moderna:** Construída com **Next.js 14** e **TypeScript**. Podes verificar o uso de **Tailwind CSS** e **Shadcn/UI** para o design, com animações fluidas em **Framer Motion**.
* **Backend Robusto:** O motor do sistema utiliza **Java 17** com **Spring Boot 3**, garantindo uma lógica de negócio eficiente e bem estruturada.
* **Dados e Persistência:** Toda a informação está organizada em **Microsoft SQL Server (MSSQL)**, utilizando **Spring Data JPA** para a gestão dos dados.
* **Segurança Avançada:** Implementei protocolos **JWT** e fluxos de **Magic Links**, para que possas aceder à plataforma com total segurança e sem a fricção de passwords tradicionais.

---

## 🚀 Funcionalidades Principais

### Gere a Tua Identidade
Podes navegar entre diferentes níveis de acesso (**RBAC**). Quer sejas um utilizador comum, um Fabricante (Partner) ou um Administrador, tens ferramentas e permissões desenhadas especificamente para o teu perfil.

### Marketplace Completo
* **Pesquisa Dinâmica:** Encontra o que procuras através de filtros por segmento, combustível, potência ou tração.
* **A Tua Garagem Virtual:** Tens um espaço dedicado para gerires o teu inventário e o histórico dos teus veículos.
* **Workflow de Parceiros:** Se fores um fabricante, podes submeter novos modelos para aprovação do administrador de forma simples.

### Suporte e Gestão
A plataforma está preparada para gerir registos de manutenção e apólices de seguro, contando ainda com um canal de suporte integrado para resolveres qualquer incidente.

---

## Demonstração da Interface

<div align="center">

  <img src="https://github.com/user-attachments/assets/141aa144-2ed3-4309-84ac-96f6dab2d39c" width="48%" alt="Autenticação" />
  <p><i>Módulos de autenticação e gestão de perfil de utilizador.</i></p>
  
  <br>
  
  <img src="https://github.com/user-attachments/assets/85d304cd-b6c3-4e15-b13d-71d52b43aca1" width="48%" alt="Submissão de Veículos" />
  <img src="https://github.com/user-attachments/assets/11e3d076-58de-4373-9971-d585145d46f3" width="48%" alt="Painel Administrativo" />
  <p><i>Gestão de propostas e dashboard de administração.</i></p>

  <br>

  <img src="https://github.com/user-attachments/assets/3fd68e01-e278-4687-a4e3-00e561980a69" width="75%" alt="Marketplace View" />
  <p><i>O Marketplace principal com visualização detalhada de inventário.</i></p>
  
</div>

---

## Documentação

Podes consultar os detalhes do planeamento e operação do sistema nos documentos incluídos na raiz:
* [`Relatorio_Tecnico_PAP.pdf`](./Relatorio_Tecnico_PAP.pdf) - Detalha a arquitetura e a lógica do sistema.
* [`Manual_de_Utilizador.pdf`](./Manual_de_Utilizador.pdf) - Guia prático de utilização.

---

## Instruções de Instalação

### O que precisas de ter instalado:
* **Java JDK 17**
* **Node.js 18+**
* **Microsoft SQL Server**

### 1. Prepara a Base de Dados
Executa o script SQL disponível em: `DB/CreateBennysDB.sql`.

### 2. Arranca o Servidor (Backend)
```bash
cd Backend/Bennys
./mvnw spring-boot:run
```

### 3. Arranca a Interface (Frontend)

```bash
cd "Frontend/Benny´sReact/bennys-app"
npm install
npm run dev
```

---

> [!TIP]
> Estado do Projeto: Embora tenha alcançado a nota máxima de 20 valores em todas as fases da PAP, este projeto ainda não está "finalizado".
