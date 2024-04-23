module.exports = {
  type: "object",
  required: ["name", "username", "password", "type", "active"],
  properties: {
    id: {
      type: "integer",
      description: "ID do usuário",
      example: 1,
    },
    name: {
      type: "string",
      description: "Nome completo do usuário",
      example: "Usuário Teste",
    },
    username: {
      type: "string",
      format: "username",
      description: "username do usuário",
      example: "usuarioteste",
    },
    role: {
      type: "string",
      description: "Role do Usuário, podendo ser 'USER' ou 'ADMIN'",
      example: "USER",
    },
    active: {
      type: "boolean",
      description: "Status do usuário",
      default: true,
    },
    birthDate: {
      type: "string",
      format: "date",
      description: "Data de nascimento do usuário",
      example: "1990-01-01",
    },
    sex: {
      type: "string",
      description: "Sexo do usuário, podendo ser 'M' ou 'F' ou 'O'",
      example: "M",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Data e hora da criação do usuário",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Data e hora da última atualização do usuário",
    },
  },
};
