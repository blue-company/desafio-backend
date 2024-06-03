# Desafio de Backend - API de Marcação de Consultas

Bem-vindo ao desafio de backend da Blue Health Tech! O desafio é uma oportunidade para demonstrar minhas habilidades de desenvolvimento de API, compreensão de conceitos de backend, e capacidade de aplicar boas práticas de engenharia de software.

## Contato
- Email: glaucoezequiel94@gmail.com
- Linkedin: https://www.linkedin.com/in/glauco-sousa-131126269/


## Como iniciar o projeto localmente

## Objetivo

Desenvolver uma API RESTful para a marcação de consultas médicas. A API permitirá que usuários façam login, agendem consultas, visualizem detalhes de suas consultas em PDF, e modifiquem ou cancelem essas consultas.

## Tecnologias utilizadas

- Node.js com Typescript.
- Express para o servidor.
- MySQL.
- ORM Sequelize para a interação com o banco de dados.
- EJS para a renderização das views. 
- JWT para a autenticação.
- Biblioteca html-pdf para gerar os pdfs das consultas.
- Biblioteca crypto para gerar os tokens das consultas.
- Bcrypt para a criptografia das senhas.


## Endpoints 
#### Autenticação

- Rota: POST /auth/register
  - Descrição: Registra um novo usuário na aplicação.
  - Requisição:
    - Campos obrigatórios:
      - name: Nome do usuário.
      - email: E-mail do usuário.
      - password: Senha do usuário.
    - Exemplo de Payload:
      ```json
      {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "senha123"
      }
      ```
  - Resposta:
    - Status 201 (Created) em caso de sucesso.
    - Status 400 (Bad Request) se algum campo obrigatório estiver faltando ou se o e-mail já estiver cadastrado.

- Rota: POST /auth/login
  - Descrição: Realiza login de um usuário existente na aplicação.
  - Requisição:
    - Campos obrigatórios:
      - email: E-mail do usuário.
      - password: Senha do usuário.
  
  - Exemplo de Payload:
      ```json
      {
        "email": "johndoe@example.com",
        "password": "senha123"
      }
      ```
  - Resposta:
    - Status 200 (OK) em caso de sucesso, com o token JWT no corpo da resposta.
    - Status 400 (Bad Request) se algum campo obrigatório estiver faltando ou se o e-mail/senha estiverem incorretos.
  
#### Consultas
-  Rota POST /api/consultation
    -  Descrição: Cria uma nova consulta
    -  Requisição:
    - Campos obrigatórios:
        - consultationDate: Data da consulta.
        - consultationTime: Hora da consulta.
        - doctor_id: ID do médico.
        - Exemplo de Payload:
          ```json
          {
            "consultationDate": "2024/08/12",
            "consultationTime": "09:00",
            "doctor_id": 1
            }
          ```
  - Resposta:
      - Status 201 (Created) em caso de sucesso.
      - Status 400 (Bad Request) se algum campo obrigatório estiver faltando ou for inválido.
      - Mensagens de erro:
        - "Médico não encontrado"
        - "Já existe uma consulta marcada com o Dr. {doctor_name} para esse horário"
        - "Data inválida"
        - "Horário inválido"

- Rota GET /api/consultation/:token
    - Descrição: Retorna o PDF com os detalhes de uma consulta específica.
    - Requisição:
        - Parâmetros obrigatórios:
            - token: Token gerado ao criar uma consulta
    - Resposta:
        - O PDF com os detalhes da consulta.
        - Status 400 (Bad Request) se o token for inválido.
        - Mensagens de erro:
            - O token deve ser passado como parâmetro na URL"
            - "Token inválido!"
        
- Rota PUT /api/consultation/:id
    - Descrição: Atualiza os detalhes de uma consulta.
    - Requisição:
        - Parâmetros obrigatórios:
            - id: Id da consulta.
        - Campos opcionais (se não forem alterados, continuarão com o mesmo valor):
            - consultationDate: Data da consulta
            - consultationTime: Horário da consulta
            - isCompleted: Status de conclusão da consulta
          - Exemplo de Payload:
          ```json
          {
            "consultationDate": "2024/08/13",
            "consultationTime": "09:30",
            "isCompleted": true
            }
          ```
    - Resposta:
        - Status 201 (Created) em caso de sucesso.
        - Status 400 (Bad Request) se algum campo obrigatório estiver faltando ou for inválido.
         - Mensagens de erro:
            - "Consulta não encontrada"
            - "O médico já possui uma consulta marcada para esse horário"
            - "Data inválida"
            - "Horário inválido"
          
- Rota DELETE /api/consultation/:id
    - Descrição:
        - Parâmetros obrigatórios:
            - id: Id da consulta.
    - Resposta:
        - Status 200 (OK) em caso de sucesso.
        - Status 400 (Bad Request) se o ID for inválido.
        - Mensagens de erro:
            - "Consulta não encontrada"
            - "Não foi possível cancelar essa consulta pois ela já foi realizada."

- Rota GET /api/consultations
    - Descrição: Retorna todas as consultas de um usuário.
    - Resposta:
        - Status 200 (OK) em caso de sucesso, com a lista de consultas no corpo da resposta.
        - Status 400 (Bad Request) se ocorrer algum erro.
        - Mensagens de erro:
            - "Não foi encontrado um histórico de consultas"

- Rota GET /api/doctors
    - Descrição:  Retorna a lista de médicos disponíveis.
    - Resposta:
        - Status 200 (OK) em caso de sucesso, com a lista de médicos no corpo da resposta.
        - Status 400 (Bad Request) se ocorrer algum erro.
        - Mensagens de erro:
            - "Não foi encontrado um histórico de consultas"
            - "Não foi encontrado nenhum médico"
          
## Entidades e relacionamentos
  #### Relacionamento do Banco de Dados
  - O banco de dados utilizado nesta API é o MySQL, e o relacionamento entre as entidades é definido da seguinte maneira:
  - Tabelas:
      1. user - Armazena informações dos usuários registrados na aplicação, como nome, e-mail e senha criptografada.
      2. doctor - Armazena informações dos médicos, como nome e especialidade.
      3. consultation - Armazena as consultas agendadas pelos usuários, incluindo data, hora, médico responsável, usuário que agendou, status de conclusão e detalhes da consulta em formato JSON.
  - Relacionamento:
      - Cada usuário pode ter várias consultas.
      - Cada médico pode ter várias consultas.
      - A tabela user possui um relacionamento de "um para muitos" com a tabela consultation.
      - A tabela doctor possui um relacionamento de "um para muitos" com a tabela consultation.
      - A tabela consultation possui chaves estrangeiras user_id e doctor_id que referenciam os IDs dos usuários e médicos, respectivamente.
