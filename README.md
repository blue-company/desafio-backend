
# API de Marcação de Consultas

  

API RESTful para a marcação de consultas médicas. A API permite que usuários façam login, agendem consultas, visualizem detalhes de suas consultas em PDF, e modifiquem ou cancelem essas consultas

  

## Sumário

- [Introdução](#introdução)

- [Recursos](#recursos)

- [Autenticação](#autenticação)

- [Endpoints](#endpoints)

- [Inicialização](#inicialização)

  
  

## Introdução

  

Esta API foi projetada com base no desafio proposto para vaga de desenvolvedor backend da empresa Blue Company. 
### Tecnologias Utilizadas 
 Este projeto foi desenvolvido utilizando as seguintes tecnologias: 
 - **Node.js**: Plataforma de desenvolvimento backend JavaScript. 
 - **Express**: Framework web para Node.js, utilizado na construção de APIs.
 -  **Sequelize**: ORM (Object-Relational Mapping) para Node.js, utilizado para facilitar a interação com o banco de dados MySQL. 
 -  **MySQL**: Sistema de gerenciamento de banco de dados relacional. 
 - **bcrypt**: Biblioteca para criptografia de senhas. 
 -  **dotenv**: Biblioteca para carregar variáveis de ambiente a partir de um arquivo `.env`.
 - **jsonwebtoken**: Biblioteca para geração e verificação de tokens de autenticação. 
 -  **pdfkit**: Biblioteca para geração de arquivos PDF.
  

## Recursos

- CRUD de usuários

- Marcação de consultas

- Atualização de consultas

- Cancelamento de consultas

- Obter todas consultas de um usuário

- Obter detalhes da consulta por um id especifico

- Obter pdf de uma consulta especifica

  
## Autenticação

  

A API utiliza autenticação baseada em tokens. Para acessar os endpoints protegidos, necessita-se incluir um token de autenticação no cabeçalho das requisições.

O token e gerado ao fazer login.

### Exemplo de Cabeçalho de Autenticação

  

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

  

## Endpoints

  ### Cadastrar usuário  "POST-http://localhost:5000/api/register"
  -  **Descrição:** Faz o cadastro  do usuário.
		

   **Body da requisição**:

     {
      "name": "jess",
      "email": "jess@example.com",
      "password": "123456"
    }

  **resposta**:
	

       {
      "message": "Usuário registrado com sucesso",
      "userObject": {
        "createdAt": "2024-06-08T13:54:39.040Z",
        "updatedAt": "2024-06-08T13:54:39.041Z",
        "id": 1,
        "name": "jess",
        "email": "jess@example.com"
      }
    }
		
### Login  "POST-http://localhost:5000/api/auth/login"

		 
-  **Descrição:** Faz o login do usuário e recebe um token.

-  **Parâmetros:**

-  `email(obrigatório)`;

-  `password(obrigatório);`

  exemplo JSON: `{
  "email":"jess@example.com",
  "password": "123456"
}`

**Resposta**:

    {
      "msg": "Autenticação realizada com sucesso!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE3ODUzNDIwLCJleHAiOjE3MTc4NTUyMjB9.bKbm87Xv8Hwtad8hpTfWSMl12N_DoO68bEg-_anNOrM"
    }


Obs: Os seguintes endpoints precisam de token para acesso:
  - **Headers:**
   Authorization: "Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
*token gerado no login.

### Criar consulta “POST-http://localhost:5000/api/appointments”

  *Ao criar uma consulta. Um arquivo pdf e criado em /pdfs, com o id da consulta, que pode ser obtido através da rota get , para obter o pdf.

-  **Body da requisição:**
     {
          "date": "07/05/2024",
          "time": "15:00",
          "address": "avenida blue company, 190",
          "doctor": "Doctors",
          "description": "alguma descrição"
     }


-  **Resposta :**

    {
      "message": "Consulta criada com sucesso",
      "appointment": {
        "id": 1,
        "date": "07/05/2024",
        "time": "15:00",
        "address": "avenda blue company, 190",
        "doctor": "Doctors",
        "description": "alguma descricao",
        "user_id": 1,
        "updatedAt": "2024-06-08T14:13:19.487Z",
        "createdAt": "2024-06-08T14:13:19.487Z"
      }
    }

  

### Atualizar Consulta "Put-http://localhost:5000/api/appointments/:id"

  
-  **Descrição:** Atualiza um consulta existente com base em seu id.

-  **Body da requisição:**

      {
      "date": "06/05/2024",
      "time": "15:00",
      "address": "avenda blue company, 190",
      "doctor": "Doctors",
      "description": "alguma descrição"
    }

  -  **Resposta da  requisição:**
       {
      "id": 1,
      "date": "06/05/2024",
      "time": "15:00",
      "address": "avenida blue company, 190",
      "doctor": "Doctors",
      "description": "alguma descrição",
      "createdAt": "2024-06-08T14:08:35.000Z",
      "updatedAt": "2024-06-08T15:20:41.211Z",
      "user_id": 1
    }

### Excluir Consulta "DELETE-http://localhost:5000/api/appointments/:id"

  -  **Descrição:** Remove uma consulta existente com base em seu ID.
  -  **Resposta da  requisição:**

    {
      "message": "consulta removida com sucesso"
    }

### Obter Consulta por ID "GET-http://localhost:5000/api/appointments/:id"
-   **Descrição:** Obtêm detalhes de um consulta de um usuário com base no id da consulta.
-   **Resposta da requisição:**

    {
      "id": 1,
      "date": "06/05/2024",
      "time": "15:00",
      "address": "avenda blue company, 190",
      "doctor": "Doctors",
      "description": "alguma descricao",
      "createdAt": "2024-06-08T14:08:35.000Z",
      "updatedAt": "2024-06-08T15:20:41.000Z",
      "user_id": 1
    }

### Obter Todas as Consultas "GET-http://localhost:5000/api/appointments"
  **Descrição:** Obtêm um array com todas consultas referentes ao usuário.
-   **Resposta da requisição:**

     {
        "id": 1,
        "date": "02/05/2024",
        "time": "11:00",
        "address": "avenida blue company, 190",
        "doctor": "Doctors",
        "description": " Get earlier dont be late",
        "createdAt": "2024-06-06T13:04:33.000Z",
        "updatedAt": "2024-06-06T13:04:33.000Z",
        "user_id": 1,
        "user": {
          "id": 1,
          "name": "Jes",
          "password": "$2b$10$zyzDxlGFfU3H8kmJ.ZeJ7uz80nGFjIcaCTExmeC8rp3f58x34DWSO",
          "email": "jess@example.com",
          "createdAt": "2024-06-05T21:32:17.000Z",
          "updatedAt": "2024-06-05T21:32:17.000Z"
        }
     }
    

### Obter pdf  "GET-http://localhost:5000/api/pdfs/:idconsulta"
  **Descrição:** Obtêm o pdf referente ao id da consulta e a disponibiliza para download.
  ![Pdf detalhes da consulta](./appointmentDetail.png)

## Inicialização 
Neste projeto e necessário ter instalado o MySQL server, assim como o Mysql Workbench para melhor visualização das informações 
```bash
    # Clone o repositório do projeto
    $ git clone git@github.com:MatheusMena/desafio-backend.git

    # Entre no diretório do projeto
    $ cd desafio-backend

    # Instale as dependências:
    $ npm install

    # Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias.
    
         # DB_HOST=localhost
    		 # DB_USERNAME=root
    		 # DB_PASSWORD=sua_senha
    		 # DB_DATABASE=nome_do_banco
    		 # JWT_SECRET=sua_chave_secreta
    		 # PORT=3000

    # Substitua `localhost`, `root`, `sua_senha`, `nome_do_banco` , `sua_chave_secreta, ` e 3000  pelos valores apropriados para o seu ambiente.

    # Execute o servidor:
    $ npm start


    # Teste a API:
    
    # Você pode usar ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar as rotas da API. ou thunderClient , extensao do vscode
```