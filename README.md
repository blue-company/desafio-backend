# Desafio de Backend - API de Marcação de Consultas
## Tecnologias utilizadas
### Composer 2.7.1
O composer é o gerenciador de pacotes, também gerencia o autoload de acordo com a psr-4.
### Symfony 7
Symfony é o framwork utilizado para criação do projeto, facilita o gerenciamento de rotas, a injeção de dependencias e tem uma variedade de bundles disponives.
### Doctrine 2.11
Docrine é um ORM (Object-relational mapping) que facilita o mapeamento de dados do universo relacional para o orientado a objetos, tambem conta com migrations facilitando gerenciamento do SGBD em vários ambientes.
### Dompdf 2.0
Dompdf é uma biblioteca para converter HTML em PDFs.
### jwt-authentication-bundle 2.20
O jwt-authentication-bundle é um bundle do Symfony para gerenciar tokens jwt.
### twig
Twig é um preprocessador de html.
## Setup
### Download
Para baixar a aplicação basta fazer um clone do repositório.
```
git clone git@github.com:Markesxd/desafio-backend.git
```
### Variaveis de ambiente
Primeiramente é necessário atualizar a o arquivo .env na rais do programa substituindo  [DB_USER] pelo nome do usuario da bando de dados e [DB_PASSWORD] pela senha deste usuario, ambas as alterações estão na variável "DATABASE_URL".
### Instalando as dependencias e o banco de dados.
Existe um arquivo setup.sh configurado para realizar essa tarefa, basta executa-lo:
``` 
./setup.sh
``` 
se por alguma razão não for possível executar o arquivo o processo pode ser feito manualmente.
Executo o código a seguir para instalar as dependencias:
```
composer install
```
Em seguida gere o par de chaves para gerenciamento do JWT:
```
php bin/console lexik:jwt:generate-keypair
```
E por fim execute os códigos para realizar a criação e migração do banco de dados: 
```
php bin/console doctrine:database:create
yes | php bin/console doctrine:migrations:migrate
```
## Execução
### Synfony
Para executar a aplicação com web server do symfony basta executar o seguinte comando: 
```
symfony server:start
```
### PHP
Para executar a aplicação com o web server do php execute o seguinte comando:
```
php -S localhost:8000 public/index.php
```
Nenhum dos servidores descritos anteriomente são indicados para ambitente de produção, mas sim para o ambiente de desenvolvimento.
## API
A aplicação em ambiente de desenvolvimento por padrão será executada na porta 8000. 
### Usuario
#### Cadastro 
```
[POST] /register
```
Cadastra um novo usuario
##### Cabeçalho
- Content-Type: application/json
##### Corpo
```json
{
  "username": "johndoe",
  "password": "test"
}
```
##### respostas
- Resposta 201 - usuario criado com sucesso.
- Resposta 400 (application/json) - usuario ou JSON formatados inedaquadamente.
```json
{
    "error": "Bad JSON format"
}
```
#### Login
```
[POST] /login
```
Realiza o login de um usuario.
##### Cabeçalho
- Content-Type: application/json
##### Corpo
```json
{
  "username": "johndoe",
  "password": "test"
}
```
##### respostas
- Resposta 200 (application/json) - usuario logado com sucesso.
```json
{
  "token": "..."
}
```
- Resposta 400 (application/json) - usuario ou JSON formatados inedaquadamente.
```json
{
    "error": "Field 'password' can not be null"
}
```
### Consulta
#### Cadastro
```
[POST] /consultas
```
Realiza o cadastro de uma consulta.
##### Cabeçalho
- Authorization: Bearearer {{token}}
- Content-Type: application/json
##### Corpo
```json
{
    "data": "2024/03/30T13:00:00-03:00",
    "details": "Detalhes da consulta"
}
```
##### respostas
- Resposta 201 - consulta criada com sucesso.  
No cabeçalho "Location" se encontra a rota cryptografada que permite acesso ao recurso.
- Resposta 400 (application/json) - consulta ou JSON formatados inedaquadamente.
```json
{
    "error": "Field 'data' can not be null"
}
```
- Resposta 401 (application/json) - JWT expirado ou inválido.
```json
{
    "code": 401,
    "message": "Expired JWT Token"
}
```
#### Listar
```
[GET] /consultas
```
Recupera uma lista de consultas.
##### Cabeçalho
- Authorization: Bearearer {{token}}
##### respostas
- Resposta 200 (application/json)

```json
[
    {
        "id": 1,
        "data": "2024-03-30T13:00:00+00:00",
        "details": "detalhes"
    }
]
```
- Resposta 401 (application/json) - JWT expirado ou inválido.
```json
{
    "code": 401,
    "message": "Expired JWT Token"
}
```
#### Detalhes/PDF
```
[GET] /consultas/{chypher}
```
Recupera o PDF com os detalhes de uma consulta.
##### Cabeçalho
- Authorization: Bearearer {{token}}
##### respostas
- Resposta 200
- Resposta 404 (application/json) - recurso não encontrado 
```json
{
    "error": "Resource not found"
}
```
- Resposta 401 (application/json) - JWT expirado ou inválido.
```json
{
    "code": 401,
    "message": "Expired JWT Token"
}
```
#### Atualzar
```
[PUT] /consultas/{id}
```
Atualiza uma consulta.
##### Cabeçalho
- Authorization: Bearearer {{token}}
##### respostas
- Resposta 200
- Resposta 400 (application/json) - Problema na forma do Json ou decrepancia no id da consulta
```json
{
    "error": "Id don't match"
}
```
- Resposta 401 (application/json) - JWT expirado ou inválido.
```json
{
    "code": 401,
    "message": "Expired JWT Token"
}
```
- Resposta 404 (application/json) - recurso não encontrado 
```json
{
    "error": "Resource not found"
}
```
#### Cancelar
```
[DELETE] /consultas/{id}
```
Cancela uma consulta.
##### Cabeçalho
- Authorization: Bearearer {{token}}
##### respostas
- Resposta 204
- Resposta 401 (application/json) - JWT expirado ou inválido.
```json
{
    "code": 401,
    "message": "Expired JWT Token"
}
```
- Resposta 404 (application/json) - recurso não encontrado 
```json
{
    "error": "Resource not found"
}
```