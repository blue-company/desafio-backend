# Desafio backend para Blue Company

## Índice

1. [Tecnologias usadas](#Tecnologias-usadas)
2. [Instalação](#instalação)
   - [Configuração arquivo .env](#configuração-do-arquivo-env)

## Tecnologias usadas

- JWT - Para autenticação de usuários na api.
- Sequelize - ORM
- Postgres - Banco de Dados relacional.
- Argon2 - Biblioteca de hashing de senhas baseada em funções.
  - Não cheguei a conclusões estabelecidas sobre a confiabilidade e performance do Argon2 nesse contexto, optei por ele devido a um erro de dependências entre a biblioteca BCrypt e o Docker. Não tenho certeza se é ideal ambientes de produção.
- Puppeter - Para geração do pdf das consultas.

## Instalação

### Requisitos

- Docker: Necessário para criar e gerenciar o ambiente de desenvolvimento do projeto.
- Docker Compose: Usado para definir e executar múltiplos contêineres Docker, incluindo a API do projeto e o banco de dados Postgres.

Para instalar o Docker e Docker Compose, siga as instruções na [documentação oficial do Docker](https://docs.docker.com/get-docker/) e na [documentação oficial do Docker Compose](https://docs.docker.com/compose/install/).

### Rodar API

Para iniciar a API Blue Med Appointments, execute o seguinte comando: `docker-compose up --build`

### Configuração arquivo .env

- Crie um arquivo `.env` na pasta config do que está na raiz do projeto.
- Copie as variáveis de ambiente presentes no arquivo `.env-example` e cole no arquivo `.env` que você criou.
