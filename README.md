## 🌐 [English Version of README](README_EN.md)

# Sistema de Protocolo de Documentos

Um backend completo para gestão de documentos com autenticação, upload de arquivos, histórico de alterações e APIs REST e GraphQL. Ideal para cenários onde é necessário registrar, consultar e auditar documentos de forma segura e rastreável.

## 🔨 Funcionalidades do Projeto

- Cadastro e autenticação de usuários (admin/user) via JWT
- CRUD de documentos com protocolo único
- Upload e download de arquivos associados aos documentos
- Histórico de alterações detalhado (quem alterou, o que mudou, quando)
- Consulta pública de documentos via GraphQL
- Testes automatizados com Vitest

### Exemplo Visual do Projeto

## ✔️ Técnicas e Tecnologias Utilizadas

- **Fastify**: Framework web rápido e leve
- **TypeScript**: Tipagem estática para maior segurança
- **Prisma**: ORM para PostgreSQL
- **JWT**: Autenticação segura
- **GraphQL (Mercurius)**: API pública de consulta
- **fastify-multipart**: Upload de arquivos
- **fastify-static**: Servir arquivos estáticos
- **Vitest**: Testes automatizados

## 📁 Estrutura do Projeto

- **public/**  
  - favicon.ico, favicon.svg, favicon-*.png: Ícones do site.
- **uploads/**  
  - Armazenamento local dos arquivos enviados.
- **prisma/**  
  - migrations/: Migrações do banco de dados.
  - schema.prisma: Definição dos modelos (User, Document, History).
- **src/**
  - **controllers/**: Lógica das rotas (auth, documentos)
  - **graphql/**: schema.gql (tipos e queries), resolvers.ts
  - **plugins/**: Autenticação, banco de dados, GraphQL
  - **schemas/**: Validações (Zod) para autenticação e documentos
  - **services/**: Regras de negócio (auth, documento, histórico)
  - **types/**: Tipagens para Fastify e Mercurius
  - **uploads/**: (vazio, usado para armazenamento)
- **test/**  
  - auth.test.ts, documents.test.ts: Testes de autenticação e documentos
- **README.md, README_EN.md**: Documentação
- **package.json, tsconfig.json, vitest.config.ts**: Configurações do projeto

## 🛠️ Abrir e rodar o projeto

Para iniciar o projeto localmente, siga os passos abaixo:

1. **Certifique-se de que o Node.js está instalado**:
   - O [Node.js](https://nodejs.org/) é necessário para rodar o projeto. Você pode verificar se já o tem instalado com:
   ```bash
   node -v
   ```
   - Se não estiver instalado, baixe e instale a versão recomendada.

2. **Clone o Repositório**:
   - Copie a URL do repositório e execute o comando abaixo no terminal:
   ```bash
   git clone 
   ```

3. **Instale as dependências**:
   ```bash
   cd 
   npm install
   ```

4. **Configure as variáveis de ambiente**:
   - Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:
     ```
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco
     JWT_SECRET=sua_senha_secreta
     ```

5. **Execute as migrações do banco de dados**:
   ```bash
   npx prisma migrate deploy
   ```

6. **Inicie o servidor**:
   ```bash
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:3000`.

## 🌐 Deploy

- O deploy pode ser feito em qualquer serviço que suporte Node.js e PostgreSQL (Vercel, Render, Railway, Heroku, etc).
- Certifique-se de configurar as variáveis de ambiente `DATABASE_URL` e `JWT_SECRET` no ambiente de produção.
- Para build de produção:
  ```bash
  npm run build
  npm start
  ```