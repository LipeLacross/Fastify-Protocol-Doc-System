## 🌐 [English Version of README](README_EN.md)

# Document Protocol System

A complete backend for document management featuring authentication, file upload, change history, and both REST and GraphQL APIs. Ideal for scenarios where secure, auditable document registration, consultation, and tracking are required.

## 🔨 Project Features

- User registration and authentication (admin/user) via JWT
- CRUD operations for documents with unique protocol numbers
- File upload and download associated with documents
- Detailed change history (who changed, what was changed, when)
- Public document queries via GraphQL
- Automated tests with Vitest

### Visual Example of the Project

## ✔️ Techniques and Technologies Used

- **Fastify**: Fast and lightweight web framework
- **TypeScript**: Static typing for safer code
- **Prisma**: ORM for PostgreSQL
- **JWT**: Secure authentication
- **GraphQL (Mercurius)**: Public query API
- **fastify-multipart**: File upload handling
- **fastify-static**: Serving static files
- **Vitest**: Automated testing

## 📁 Project Structure

- **public/**
  - favicon.ico, favicon.svg, favicon-*.png: Site icons
- **uploads/**
  - Local storage for uploaded files
- **prisma/**
  - migrations/: Database migrations
  - schema.prisma: Model definitions (User, Document, History)
- **src/**
  - **controllers/**: Route logic (auth, documents)
  - **graphql/**: schema.gql (types and queries), resolvers.ts
  - **plugins/**: Authentication, database, GraphQL
  - **schemas/**: Validation (Zod) for authentication and documents
  - **services/**: Business logic (auth, document, history)
  - **types/**: Type definitions for Fastify and Mercurius
  - **uploads/**: (empty, used for storage)
- **test/**
  - auth.test.ts, documents.test.ts: Authentication and document tests
- **README.md, README_EN.md**: Documentation
- **package.json, tsconfig.json, vitest.config.ts**: Project configuration

## 🛠️ How to Run the Project

To start the project locally, follow these steps:

1. **Ensure Node.js is installed**:
   - [Node.js](https://nodejs.org/) is required to run the project. You can check if it's installed with:
   ```bash
   node -v
   ```
   - If not installed, download and install the recommended version.

2. **Clone the Repository**:
   - Copy the repository URL and run the command below in your terminal:
   ```bash
   git clone 
   ```

3. **Install dependencies**:
   ```bash
   cd 
   npm install
   ```

4. **Configure environment variables**:
   - Create a `.env` file in the project root with the necessary variables, for example:
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/database
     JWT_SECRET=your_secret_key
     ```

5. **Run database migrations**:
   ```bash
   npx prisma migrate deploy
   ```

6. **Start the server**:
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:3000`.

## 🌐 Deploy

- Deployment can be done on any service that supports Node.js and PostgreSQL (Vercel, Render, Railway, Heroku, etc).
- Make sure to set the environment variables `DATABASE_URL` and `JWT_SECRET` in your production environment.
- For a production build:
  ```bash
  npm run build
  npm start
  ```

---
