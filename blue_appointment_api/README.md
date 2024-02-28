# API de Marcação de Consultas - Documentação

## Descrição
Bem-vindo à documentação da API de Marcação de Consultas da Blue Health Tech. Este projeto visa fornecer uma solução robusta e eficiente para a marcação de consultas médicas, oferecendo funcionalidades de autenticação, agendamento, geração de PDF, visualização e modificação/cancelamento de consultas.

## Tecnologias Utilizadas
- Symfony Framework (Route Annotation)
- Doctrine ORM
- JWT para autenticação
- MySQL
- Docker e Docker-Compose

## Instalação e Execução
⚠️ **Atenção: Antes de prosseguir, certifique-se de ter o Docker e Docker Compose instalados em sua máquina.**

1. Clone o projeto na sua máquina.
```bash
git clone git@github.com:abnerferreiradesousa/desafio-backend.git
```

2. Entre na pasta do projeto.
```bash
cd desafio-backend/blue_appointment_api/
```

3. Siga as instruções específicas para configurar o ambiente de desenvolvimento (incluir dependências, configurações do banco de dados, etc.).
```bash
docker-compose up --build -d
```

4. Quando terminar, a API estará pronta para receber requisições no endereço [http://localhost:8000/api](http://localhost:8080/api), basta seguir os exemplos na seção [Rotas Disponíveis - Fluxo de Utilização](#registro-de-usuario). Embora o [cURL](https://curl.se/) esteja sendo usado nos exemplos abaixo, o ideal para uma melhor experiência(visualizar o arquivo .pdf) é Postman ou a ferramenta gráfica de sua escolha.

Este projeto utiliza Docker para facilitar a configuração do ambiente. Certifique-se de ter as ferramentas mencionadas instaladas antes de prosseguir.

## Testes Unitários e de Integração

### Testes Realizados

Neste projeto, foram realizados alguns testes unitários e de integração para garantir a robustez e confiabilidade do código. Embora o número de testes seja limitado no momento, o foco é garantir a qualidade das funcionalidades principais.

### Como Rodar os Testes

Para executar os testes unitários e de integração, siga as instruções abaixo:

1. Certifique-se de estar na raiz do projeto:
```bash
cd desafio-backend/blue_appointment_api/
```

2. Construa e inicie os containers Docker (se ainda não estiverem em execução):
```bash
docker-compose up --build -d
```

3. Execute o seguinte comando para rodar os testes dentro do container Docker:
```bash
docker-compose exec php php bin/phpunit
```

Essa abordagem permite executar os testes diretamente no container Docker sem a necessidade de entrar manualmente no ambiente do container.

## Rotas Disponíveis - Fluxo de Utilização

### Usuários
#### Registro de Usuário
- **POST /api/user/register**
  - Registra um novo usuário.
  - **Exemplo de Requisição:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"email": "garfield@gmail.com", "sex": "M", "fullName": "Garfield", "birthDate": "1978-06-19", "password": "lasagna_lover"}' http://localhost:8000/api/user/register
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 200 OK
    {"patientId": "garfield_user_id"}
    ```

#### Autenticação - Login
- **POST /api/login**
  - Realiza o login e retorna um token JWT.
  - **Exemplo de Requisição:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"username": "garfield@gmail.com", "password": "lasagna_lover"}' http://localhost:8000/api/login
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 200 OK
    {"token": "garfield_jwt_token"}
    ```

### Marcação de Consultas Médicas
#### Criação de Consulta
- **POST /api/medical-appointments/create**
  - Cria uma nova consulta médica.
  - **Exemplo de Requisição:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer garfield_jwt_token" -d '{"notes": "Em abril foi parar no hospital depois de comer muita lasagna.", "titleReason": "Check-up", "descriptionReason": "Checagem anual de saúde do Garfield", "appointmentDate": "2023-03-01", "patientId": "garfield_user_id"}' http://localhost:8000/api/medical-appointments/create
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 201 Created
    {"appointment_details_link": "http://localhost:8000/api/medical-appointments/view/{token}", "appointment_id": "garfield_appointment_id"}
    ```

#### Visualização de Consulta em PDF
- **GET /api/medical-appointments/view/{token}**
  - Visualiza detalhes da consulta em PDF.
  - **Exemplo de Requisição:**
    ```bash
    curl -X GET -H "Authorization: Bearer garfield_jwt_token" http://localhost:8000/api/medical-appointments/view/{token}
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 200 OK
    Content-Type: application/pdf
    ```
    (Binary PDF content)

#### Modificação de Consulta
- **PUT /api/medical-appointments/modify/{id}**
  - Modifica detalhes de uma consulta médica.
  - **Exemplo de Requisição:**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer garfield_jwt_token" -d '{"notes": "Em abril foi parar no hospital depois de comer muita lasagna. E depois disso o médico recomendou que ele fizesse mais exercícios", "titleReason": "Comeu demais de novo", "descriptionReason": "Check-up anual", "appointmentDate": "2023-03-01", "patientId": "garfield_user_id"}' http://localhost:8000/api/medical-appointments/modify/{id}
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 200 OK
    {"message": "Medical appointment modified successfully"}
    ```

#### Geração de Link de Acesso à Consulta
- **POST /api/medical-appointments/access-link-generator/{id}**
  - Gera um link de acesso para a consulta.
  - **Exemplo de Requisição:**
    ```bash
    curl -X POST -H "Authorization: Bearer garfield_jwt_token" http://localhost:8000/api/medical-appointments/access-link-generator/{id}
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 201 Created
    {"appointment_details_link": "http://localhost:8000/api/medical-appointments/view/{token}"}
    ```

#### Cancelamento de Consulta
- **DELETE /api/medical-appointments/cancel/{id}**
  - Cancela uma consulta médica.
  - **Exemplo de Requisição:**
    ```bash
    curl -X DELETE -H "Authorization: Bearer garfield_jwt_token" http://localhost:8000/api/medical-appointments/cancel/{id}
    ```
  - **Resposta de Sucesso:**
    ```http
    HTTP/1.1 204 No Content
    ```

## Estrutura do Projeto
O projeto segue a arquitetura MVC (Model-View-Controller) para uma organização clara e modular. A estrutura básica inclui:
- `src/`: Contém os controladores, modelos(repository) e serviços.
- `config/`: Configurações da aplicação, rotas e serviços.
- `templates/`: Modelos de visualização para geração de PDF.

## Referências

1. https://symfony.com/
2. https://www.binaryboxtuts.com/php-tutorials/generating-pdf-from-html-in-symfony-6/
3. https://www.youtube.com/watch?v=XjbIDOIoXTo&t=347s
4. https://docs.docker.com/compose/
5. https://symfony.com/doc/current/routing.html#creating-routes
6. https://symfony.com/doc/current/event_dispatcher.html
7. https://symfony.com/doc/current/testing.html
8. https://medium.com/accesto/simple-docker-setup-for-symfony-project-accesto-blog-9dc4e3179642
9. https://www.binaryboxtuts.com/php-tutorials/symfony-6-json-web-tokenjwt-authentication/
10. https://symfony.com/doc/current/doctrine.html
11. https://symfony.com/bundles/LexikJWTAuthenticationBundle/current/index.html

## Feedback
Gostei muito do projeto, sem dúvida pude me desafiar muito! O ponto de melhoria que eu faria é somente:

1. Deixar mais claro o retorno de cada rota, fiquei confuso sobre quando deveria ser retornado o PDF(no momento da criação da consulta ou se o PDF era só pra ser gerado e retornado posteriormente em outra funcionalidade, tendo em vista que tem uma requisito de visualização de detalhes de uma consulta).

No mais, obrigado! Eu gostei muito mesmo do projeto!