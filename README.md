# Desafio backend para Blue Company

## Índice

1. [Tecnologias usadas](#Tecnologias-usadas)
2. [Instalação](#instalação)
   - [Configuração arquivo .env](#configuração-do-arquivo-env)
3. [Requisitos](#requisitos)
4. [Executando a API](#executando-a-api)
   - [docker-compose](#docker-compose)
   - [NodeJS - NPM](#nodejs---npm)
5. [Documentação da API](#documentação-da-api)
   - [Swagger](#swagger)

## Tecnologias usadas

- JWT - Para autenticação de usuários na api usando tokens de acesso.
- Sequelize - ORM utilizado para facilitar a interação com o banco de dados Postgres.
- Postgres - Banco de Dados relacional utilizado para armazenar e gerenciar os dados da aplicação.
- Argon2 - Biblioteca de hashing de senhas baseada em funções.
  - Não cheguei a conclusões estabelecidas sobre a confiabilidade e performance do Argon2 nesse contexto, optei por ele devido a um erro de dependências entre a biblioteca BCrypt e o Docker. Não tenho certeza se é ideal ambientes de produção.
- Crypto: Usei para criptografar o secureId da Consulta, que é usado como parametro na geração do PDF.
- Puppeter - Para geração do pdf das consultas.
- Swagger-jsdoc e Swagger-ui-express: Para documentar a API de maneira interativa.
- Supertest e Jest: Usado para testar os endpoints HTTP da API.

## Instalação

### Requisitos

- Docker: Necessário para criar e gerenciar o ambiente de desenvolvimento do projeto.
- Docker Compose: Usado para definir e executar múltiplos contêineres Docker, incluindo a API do projeto e o banco de dados Postgres.

Para instalar o Docker e Docker Compose, siga as instruções na [documentação oficial do Docker](https://docs.docker.com/get-docker/) e na [documentação oficial do Docker Compose](https://docs.docker.com/compose/install/).

### Configuração arquivo .env

#### Essa configuração é opcional pois ao usar o comando `docker-compose up --build`, ele aciona os scripts que copia as variáveis de `.env-example` e cria o arquivo `.env` automaticamente.

- Crie um arquivo `.env` na pasta config do que está na raiz do projeto.
- Copie as variáveis de ambiente presentes no arquivo `.env-example` e cole no arquivo `.env` que você criou.

### Executando a API

#### docker-compose

- Para iniciar a API Blue Med Appointments, execute o seguinte comando: `docker-compose up --build`

#### NodeJS - NPM

- Caso queira executar a API sem o Docker, você precisará ter o Node.js e o NPM instalados em sua máquina.
- Após a instalação, navegue até a pasta raiz do projeto e execute o comando `npm install` para instalar todas as dependências do projeto.
- Em seguida, execute o comando `npm run dev` para iniciar a API.
- Por favor, note que você precisará ter uma instância do Postgres rodando e configurada corretamente no seu arquivo `.env` para que a API funcione corretamente.

## Documentação da API

### Swagger

- A API Blue Med Appointments possui uma documentação interativa criada com Swagger. Para acessá-la, inicie sua API e navegue até `http://localhost:3000/docs`. Aqui você poderá visualizar todos os endpoints disponíveis, seus parâmetros, e testá-los diretamente através da interface Swagger.
