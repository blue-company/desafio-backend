module.exports = {
  type: "object",
  required: [
    "id",
    "userId",
    "doctorName",
    "specialtyName",
    "appointmentDate",
    "appointmentInitialTime",
    "appointmentFinalTime",
    "status",
    "user",
    "doctor",
  ],
  properties: {
    id: {
      type: "number",
      description: "ID da consulta",
    },
    userId: {
      type: "number",
      description: "ID do usuário",
    },
    doctorName: {
      type: "string",
      description: "Nome do médico",
    },
    specialtyName: {
      type: "string",
      description: "Nome da especialidade",
    },
    appointmentDate: {
      type: "string",
      format: "date",
      description: "Data da consulta",
    },
    appointmentInitialTime: {
      type: "string",
      format: "time",
      description: "Hora inicial da consulta",
    },
    appointmentFinalTime: {
      type: "string",
      format: "time",
      description: "Hora final da consulta",
    },
    status: {
      type: "string",
      description: "Status da consulta",
    },
    user: {
      type: "object",
      required: ["id", "name", "username", "role", "birthDate", "sex"],
      properties: {
        id: {
          type: "number",
          description: "ID do usuário",
        },
        name: {
          type: "string",
          description: "Nome do usuário",
        },
        username: {
          type: "string",
          description: "Nome de usuário",
        },
        role: {
          type: "string",
          description: "Papel do usuário",
        },
        birthDate: {
          type: "string",
          format: "date",
          description: "Data de nascimento do usuário",
        },
        sex: {
          type: "string",
          description: "Sexo do usuário",
        },
      },
    },
    doctor: {
      type: "object",
      required: ["fullName", "specialty"],
      properties: {
        fullName: {
          type: "string",
          description: "Nome completo do médico",
        },
        specialty: {
          type: "string",
          description: "Especialidade do médico",
        },
      },
    },
  },
};
