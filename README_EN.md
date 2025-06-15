
## 🌐 [Versão em Português](README.md)

# Document Protocol System

A complete backend for document management featuring authentication, file upload, change history, and both REST and GraphQL APIs. Ideal for scenarios where secure, auditable document registration, consultation, and tracking are required.

---

## 🔨 Project Features

- **User registration and authentication** (admin/user) via JWT
- **CRUD operations for documents** with unique protocol numbers
- **Upload and download of files** associated with documents
- **Detailed change history** (who changed, what was changed, when)
- **Public document queries** via GraphQL
- **Automated tests** with Vitest

---

## 📸 Visual Example

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

## ✔️ Techniques and Technologies Used

- **Fastify**: Fast and lightweight web framework
- **TypeScript**: Static typing for greater security
- **Prisma**: ORM for PostgreSQL
- **JWT**: Secure authentication
- **GraphQL (Mercurius)**: Public query API
- **fastify-multipart**: File upload handling
- **fastify-static**: Serving static files
- **Vitest**: Automated testing

---

## 📁 Project Structure

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

## 🛠️ How to Run the Project

To start the project locally, follow the steps below:

1. **Ensure Node.js is installed**  
   - [Node.js](https://nodejs.org/) is required to run the project.  
   - Check if it is installed with:
   ```bash
   node -v
   ```
   - If not installed, download and install the recommended version.

2. **Clone the Repository**  
   - Copy the repository URL and run the following command in your terminal:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```

3. **Install dependencies**  
   ```bash
   npm install
   ```

4. **Configure environment variables**  
   - Create a `.env` file in the project root with the necessary variables, for example:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/database
   JWT_SECRET=your_secret_key
   ```

5. **Run database migrations**  
   ```bash
   npx prisma migrate deploy
   ```

6. **Start the server**  
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:3000`.

---

## 🌐 Deployment

- **Deployment can be done on any service that supports Node.js and PostgreSQL** (Vercel, Render, Railway, Heroku, etc).
- **Make sure to set the environment variables** (`DATABASE_URL` and `JWT_SECRET`) in your production environment.
- **For a production build**:
  ```bash
  npm run build
  npm start
  ```

---