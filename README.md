# Benny's Platform 🏎️

> **O meu Projeto de Aptidão Profissional (PAP) | Classificação Final: 20/20**
> 
> Bem-vindo à **Benny's Platform**. Desenvolvi esta solução Full-Stack para te oferecer um marketplace automóvel completo, onde podes centralizar a compra, venda e gestão de veículos numa experiência que prioriza a segurança e a simplicidade.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.0-green?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![SQL Server](https://img.shields.io/badge/MSSQL-2019-red?style=flat-square&logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

---

## 📑 O Meu Percurso Académico

Criei este projeto como prova final para o curso **Técnico de Gestão e Programação de Sistemas Informáticos** na **Escola Secundária António Damásio** (2023/2024). 

Fiquei muito orgulhoso por alcançar a **classificação final de 20 valores**. Esta nota reflete todo o trabalho que vais encontrar aqui: desde o desenvolvimento da plataforma e a redação do relatório técnico, até à apresentação e defesa final perante o júri. É um projeto que representa a minha qualificação de **Nível IV** do Quadro Nacional de Qualificações.

---

## 🛠️ Tecnologias que Vais Encontrar

Para garantir que a plataforma é robusta e rápida, escolhi tecnologias modernas que podes explorar no código:

* **Frontend:** Utilizei **Next.js 14** com **TypeScript**. Para o design, usei **Tailwind CSS** e **Shadcn/UI**, garantindo que as animações feitas com **Framer Motion** tornam a navegação mais fluida.
* **Backend:** O "motor" do sistema corre em **Java 17** com **Spring Boot 3**. Para a persistência de dados, podes verificar a implementação do **Spring Data JPA**.
* **Base de Dados:** Toda a informação está estruturada em **Microsoft SQL Server (MSSQL)**.
* **Segurança:** Implementei protocolos **JWT** e um sistema de **Magic Links**. Assim, podes ter a certeza de que o acesso é seguro e livre de passwords complicadas.

---

## 🚀 O que Podes Fazer na Plataforma?

### Gere a Tua Identidade
Podes navegar por diferentes níveis de acesso (**RBAC**). Quer sejas um Utilizador comum, um Fabricante (Partner) ou um Administrador, tens permissões e ferramentas específicas para as tuas necessidades.

### Explora o Mundo Automóvel
* **Pesquisa à Tua Medida:** Podes filtrar veículos por combustível, tração, potência ou segmento.
* **A Tua Garagem Virtual:** Tens um espaço dedicado para gerires o teu inventário pessoal.
* **Parcerias:** Se fores um fabricante, podes submeter propostas de novos modelos que passam por um fluxo de aprovação transparente.

### Apoio e Gestão
O sistema já está preparado para te ajudar com registos de manutenção, apólices de seguro e um canal direto de suporte para resolveres qualquer incidente.

---

## 📸 Espreita a Interface

<div align="center">

  <img src="https://github.com/user-attachments/assets/141aa144-2ed3-4309-84ac-96f6dab2d39c" width="48%" alt="Autenticação" />
  <p><i>Módulos de autenticação e gestão do teu perfil.</i></p>
  
  <br>
  
  <img src="https://github.com/user-attachments/assets/85d304cd-b6c3-4e15-b13d-71d52b43aca1" width="48%" alt="Submissão de Veículos" />
  <img src="https://github.com/user-attachments/assets/11e3d076-58de-4373-9971-d585145d46f3" width="48%" alt="Painel Administrativo" />
  <p><i>Aqui podes gerir propostas e aceder ao dashboard de administração.</i></p>

  <br>

  <img src="https://github.com/user-attachments/assets/3fd68e01-e278-4687-a4e3-00e561980a69" width="75%" alt="Marketplace" />
  <p><i>O Marketplace principal: vê todos os detalhes técnicos de cada veículo.</i></p>
  
</div>

---

## 📄 Documentação

Podes consultar todos os detalhes do planeamento nos documentos que deixei na raiz do repositório:
* [`Relatorio_Tecnico_PAP.pdf`](./Relatorio_Tecnico_PAP.pdf) - A base teórica e técnica de todo o projeto.
* [`Manual_de_Utilizador.pdf`](./Manual_de_Utilizador.pdf) - Um guia prático para saberes como usar a plataforma.

---

## ⚙️ Instruções de Instalação

### O que precisas de ter instalado:
* **Java JDK 17**
* **Node.js 18+**
* **Microsoft SQL Server**

### 1. Configura a Base de Dados
Executa o script SQL que encontras aqui: `DB/CreateBennysDB.sql`.

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
