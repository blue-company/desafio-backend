# Desafio de Backend - API de Marcação de Consultas

## Desenvolvedor

- Emerson Dantas Pereira
- Email: emerson.dantaspereira@hotmail.com
- [LinkedIn](https://www.linkedin.com/in/emersondantaspereira/)
- [Github](https://github.com/emersondp07)

### Tecnologias e Ferramentas utilizadas:

- [Node](https://nodejs.org/en/): Ambiente de execução JavaScript de código aberto e multiplataforma.
- [Typescript](https://nodejs.org/en/): TypeScript é uma linguagem que adiciona tipagem estática e recursos avançados ao JavaScript.
- [Express](https://expressjs.com): Framework para Node.js para construção de servidores web.
- [Postgres](https://www.postgresql.org/): Banco de dados relacional.
- [Prisma](https://www.prisma.io): ORM utilizado para utilização de consultas no banco de dados.
- [Zod](https://zod.dev): Biblioteca de declaração e validação de esquema TypeScript.
- [JWT](https://jwt.io/): É uma ferramenta utilizada para a geração e verificação de tokens de autenticação e autorização em aplicações web.
- [express-async-errors](https://www.npmjs.com/package/express-async-errors): Utilizada em aplicações Node.js com o framework Express para simplificar o tratamento de erros em rotas assíncronas.
- [pdfkit](pdfkit.org/): Biblioteca de geração de documentos PDF para Node e navegador que facilita a criação de documentos complexos.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): Este módulo permite que forneça documentos de API gerados automaticamente através da leitura de um arquivo mapeado em JSON.

## Rodar o projeto:

**É necessário ter o [Docker Compose](https://docs.docker.com/compose/install/) e uma extenção chamada Dev Containers**

```bash
    # Clone o repositório do projeto
    $ git clone https://github.com/emersondp07/desafio-backend.git

    # Entre no diretório do projeto
    $ cd desafio-backend

    # Abrir as opções da extensão Dev Containers
    $ Ctrl + Shift + P

    # Escolher a opção e escolher executar na raiz do projeto
    $ Dev Containers: Open folder in Container

    # Instala as dependências
    $ yarn

    # Faz as migrações e gera as tipagens no CLI do prisma no projeto
    $ yarn gen
```

**Com o projeto rodando, a documentação da API se encontrará em [localhost:3000/docs](http://localhost:3000/docs)**
