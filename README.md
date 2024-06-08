# API de Marcação de Consultas

API RESTful para a marcação de consultas médicas. A API permite que usuários façam login, agendem consultas, visualizem detalhes de suas consultas em PDF, e modifiquem ou cancelem essas consultas

## Sumário

- [Introdução](#introdução)
- [Recursos](#recursos)
- [Organização das pastas](#organização-das-pastas)
- [Autenticação](#autenticação)
- [Endpoints](#endpoints)
- [Inicialização](#inicialização)
- [Erros Comuns](#erros-comuns)
- [Contribuição](#contribuição)
- [Licença](#licença)


## Introdução

Esta API foi projetada com base no desafio proposto para vaga de desenvolvedor backend da empresa Blue Company. Utilizando Nodejs e Express. Sequelize como ferramenta para auxilio do banco de dados em Mysql.

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

### Marcar Consulta


- **Descrição:** Marca uma nova consulta.
- **Parâmetros:**
  - `paciente_id` (obrigatório): ID do paciente
  - `data_hora` (obrigatório): Data e hora da consulta no formato ISO 8601
  - `especialidade` (opcional): Especialidade médica

### Atualizar Consulta


- **Descrição:** Atualiza uma consulta existente.
- **Parâmetros:**
  - `id` (obrigatório): ID da consulta
  - `data_hora` (opcional): Nova data e hora da consulta no formato ISO 8601
  - `especialidade` (opcional): Nova especialidade médica

### Cancelar Consulta


- **Descrição:** Marca uma nova consulta.
- **Parâmetros:**
  - `paciente_id` (obrigatório): ID do paciente
  - `data_hora` (obrigatório): Data e hora da consulta no formato ISO 8601
  - `especialidade` (opcional): Especialidade médica

### Atualizar Consulta

## Inicialização
		Para iniciar o projeto clone este repositorio
		para teste o projeto e necessario ter sql server instalado em sua maquina.
		(read me em desenvolvimento)