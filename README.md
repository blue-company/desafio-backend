# 📖 Apresentação

O projeto "desafio-backend" é um desafio proposto pela Blue Health Tech, que envolve o desenvolvimento de uma API para cadastro de consultas com autenticação de usuários. Nesse projeto, é possível criar e acessar uma conta através de login, além de registrar novas consultas, cujo retorno inclui um PDF com os detalhes da consulta marcada. Também é possível editar, visualizar e cancelar consultas médicas.

Também ao longo do tempo irei fazer os testes unitários e de integração da aplicação para torna-la mais completa.


### Informações Pessoais

- Italo Rocha Oliveira
- [Linkedin](https://www.linkedin.com/in/italorochaoliveira/).
- [Github](https://github.com/ItaloRochaOliveira).
- Email: italo.rocha.de.oliveira@gmail.com

## 📄 Concepção do Projeto

### Instalando

```bash
# Instalando o repositório localmente
git clone git@github.com:ItaloRochaOliveira/desafio-backend.git

# Entre no diretório do projeto
cd desafio-backend

# Instalando dependências
npm install

# Suba o container do banco de dados
docker compose up -d

# executando o projeto
npm run dev

```

## 🔧 Funcionalidades

```bash
. Requisições:
#------------------------------------------------
-SignUp: criação de um usuario.

-Login: Entrar com usuário cadastrado.
#------------------------------------------------
-getAppointment: Puxa todas as consultas
cadastradas no banco de dados em formato de link.
Necessário o
token de acesso.

-getAppointmentById: Retorna o link vinculada ao id
do usuário e a da consulta. Usado no próprio back
para gerar os links da resposta da requisição acima.

-postMedicalAppointment: Método de criação de
consultas. Nescessário o token do usuário
cadastrado e valores.

-editMedicalAppointment: Método de atualização dos
dados cadastrados. Nescessário o token do usuário
cadastrado, id da consulta a alterar e valores.

-cancelMedicalAppointment: Método de cancelamento
de consulta. Necessário do id da consulta e token
do usuário.
```


## 📚 Bibliotecas utilizadas 

```bash
#dependencies:
bcryptjs
cors
express,
jsonwebtoken
knex
mysql,
pdfmake,
uuid
zod

#devDependencies:
@types/bcryptjs
@types/cors
@types/express
@types/jest
@types/jsonwebtoken
@types/knex 
@types/mysql
@types/node .
@types/pdfmake
@types/uuid
dotenv 
jest 
ts-jest 
ts-node-dev
typescript 

```
## 💻 Programas e tecnologias utilizadas


![VSCode](https://img.shields.io/badge/VSCODE-white?style=for-the-badge&logo=visualstudiocode&logoColor=blue)
![PostMan](https://img.shields.io/badge/postman-orange?style=for-the-badge&logo=postman&logoColor=white)

![TypesScript](https://img.shields.io/badge/TypeScript-1572B6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-f8f8ff?style=for-the-badge&logo=express&logoColor=black)
![MySQL](https://img.shields.io/badge/mysql-orange?style=for-the-badge&logo=mysql&logoColor=blue)
![jest](https://img.shields.io/badge/jest-f8f8ff?style=for-the-badge&logo=jest&logoColor=black)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
