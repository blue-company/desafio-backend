const swaggerJSDoc = require("swagger-jsdoc");
const User = require("./schemas/User");
const Appointment = require("./schemas/Appointment");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blue Med Appointments API",
      version: "1.0.0",
      description: "API de Marcação de Consultas",
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
