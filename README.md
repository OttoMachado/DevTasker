# DevTasker

O projeto **DevTasker** consiste em um sistema voltado para a **gestão de tarefas de equipes de desenvolvimento**. A aplicação tem como principal objetivo **gerenciar usuários, tarefas e projetos**. A estrutura implementa as funcionalidades de cadastro, autenticação e gerenciamento de usuários, utilizando autenticação JWT.

#### Funcionalidades:
- Registro de novos usuários com validações
- Autenticação via JWT
- Consulta, atualização e remoção de usuários
- Proteção de rotas por middleware de autenticação

## 👥 Integrantes

- Otto Machado  
- Henrique  
- Murilo  

## 🛠 Tecnologias utilizadas

- TypeScript
- Node.js
- Express
- TypeORM
- JWT (JSON Web Token)

## 🚀 Como rodar o projeto

#### Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

#### Inicie o servidor:
```
npm run dev
```
O servidor estará disponível em http://localhost:3000

### 📡 API

#### Autenticação
- `POST /api/register` – Registro de novo usuário  
- `POST /api/login` – Autenticação de usuário  

#### Usuários
- `GET /api/users` – Listar todos os usuários 
- `GET /api/users/:id` – Buscar usuário por ID 
- `PUT /api/users/:id` – Atualizar informações do usuário 
- `DELETE /api/users/:id` – Deletar usuário 

