const swaggerJSDoc = require("swagger-jsdoc");
const User = require("./schemas/User");
const Appointment = require("./schemas/Appointment");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Agendamentos Blue Med",
      version: "1.0.0",

      description: `Esta API usa autenticação via token. Você pode obter o token usando as rotas 'register' ou 'login'.
      Uma vez que você tenha o token, você pode autenticar suas solicitações adicionando-o ao cabeçalho 'Authorization' no formato 'Bearer {seu_token_aqui}'.
      Se for necessário, você pode usar o Swagger para testar as rotas protegidas clicando no botão Authorize e colando seu token em 'value'.`,
    },
    components: {
      schemas: {
        User: User,
        Appointment: Appointment,
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
