Segue a versão consolidada do README conforme a estrutura atual do projeto, com todas as atualizações necessárias e imagens organizadas em colunas para melhor visualização.  
Utilizei o conteúdo dos arquivos anexados para garantir que o README reflita fielmente o que está implementado.

---

## 🌐 [English Version of README](README_EN.md)

# Sistema de Protocolo de Documentos

Um backend completo para gestão de documentos com autenticação, upload de arquivos, histórico de alterações e APIs REST e GraphQL. Ideal para cenários onde é necessário registrar, consultar e auditar documentos de forma segura e rastreável.

---

## 🔨 Funcionalidades do Projeto

- **Cadastro e autenticação de usuários** (admin/user) via JWT
- **CRUD de documentos** com protocolo único
- **Upload e download de arquivos** associados aos documentos
- **Histórico de alterações detalhado** (quem alterou, o que mudou, quando)
- **Consulta pública de documentos** via GraphQL
- **Testes automatizados** com Vitest
- 
---

## 📸 Exemplo Visual do Projeto

<div align="center">
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-bottom: 30px;">
    <img src="https://github.com/user-attachments/assets/32d750a3-f6df-4ea8-8197-834d07c56451" width="400" alt="Home page">
    <img src="https://github.com/user-attachments/assets/5ce22afe-c686-4b88-b177-a056f156a345" width="400" alt="Authentication">
    <img src="https://github.com/user-attachments/assets/3fee4659-5394-4ef0-b4ff-705fab2b939f" width="400" alt="Documents">
  </div>
  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px;">
    <img src="https://github.com/user-attachments/assets/c2431858-f9ee-463c-b40b-6e463936a988" width="400" alt="Uploads">
    <img src="https://github.com/user-attachments/assets/bf08cdd2-2cc9-49b5-8521-21a8a31732d5" width="400" alt="GraphQL">
  </div>
</div>

---

## ✔️ Técnicas e Tecnologias Utilizadas

- **Fastify**: Framework web rápido e leve
- **TypeScript**: Tipagem estática para maior segurança
- **Prisma**: ORM para PostgreSQL
- **JWT**: Autenticação segura
- **GraphQL (Mercurius)**: API pública de consulta
- **fastify-multipart**: Upload de arquivos
- **fastify-static**: Servir arquivos estáticos
- **Vitest**: Testes automatizados

---

## 📁 Estrutura do Projeto

```
|-- LICENSE
|-- README.md
|-- README_EN.md
|-- ideas.txt
|-- nodemon.json
|-- package-lock.json
|-- package.json
|-- prisma/
  |-- migrations/
  |-- schema.prisma
|-- public/
  |-- favicon-128.png
  |-- favicon-16.png
  |-- favicon-256.png
  |-- favicon-32.png
  |-- favicon-48.png
  |-- favicon-96.png
  |-- favicon.ico
  |-- favicon.svg
|-- src/
  |-- controllers/
    |-- auth.controller.ts
    |-- documents.controller.ts
  |-- graphql/
    |-- resolvers.ts
    |-- schema.gql
  |-- index.ts
  |-- plugins/
    |-- auth.ts
    |-- db.ts
    |-- graphql.ts
  |-- schemas/
    |-- auth.schema.ts
    |-- documents.schema.ts
  |-- services/
    |-- auth.service.ts
    |-- document.service.ts
    |-- history.service.ts
  |-- types/
    |-- fastify.d.ts
    |-- mercurius.d.ts
  |-- uploads/
|-- test/
  |-- auth.test.js
  |-- auth.test.ts
  |-- documents.test.js
  |-- documents.test.ts
|-- tsconfig.json
|-- uploads/
|-- vitest.config.ts
```

---

## 🛠️ Abrir e rodar o projeto

Para iniciar o projeto localmente, siga os passos abaixo:

1. **Certifique-se de que o Node.js está instalado**  
   - O [Node.js](https://nodejs.org/) é necessário para rodar o projeto.  
   - Verifique se já está instalado com:
   ```bash
   node -v
   ```
   - Se não estiver instalado, baixe e instale a versão recomendada.

2. **Clone o Repositório**  
   - Copie a URL do repositório e execute o comando abaixo no terminal:
   ```bash
   git clone https://github.com/seu_usuario/seu_repositorio.git
   cd seu_repositorio
   ```

3. **Instale as dependências**  
   ```bash
   npm install
   ```

4. **Configure as variáveis de ambiente**  
   - Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:
   ```
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco
   JWT_SECRET=sua_senha_secreta
   ```

5. **Execute as migrações do banco de dados**  
   ```bash
   npx prisma migrate deploy
   ```

6. **Inicie o servidor**  
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`.

---

## 🌐 Deploy

- **O deploy pode ser feito em qualquer serviço que suporte Node.js e PostgreSQL** (Vercel, Render, Railway, Heroku, etc).
- **Certifique-se de configurar as variáveis de ambiente** (`DATABASE_URL` e `JWT_SECRET`) no ambiente de produção.
- **Para build de produção**:
  ```bash
  npm run build
  npm start
  ```

  
