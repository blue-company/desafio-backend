module.exports = {
  type: 'object',
  required: ['fullName', 'username', 'password', 'type', 'active'],
  properties: {
    fullName: {
      type: 'string',
      description: 'Nome completo do usuário',
    },
    username: {
      type: 'string',
      format: 'username',
      description: 'username do usuário',
    },
    password: {
      type: 'string',
      format: 'password',
      description: 'Senha criptografada do usuário',
    },
    type: {
      type: 'string',
      description: 'Tipo do usuário',
      default: 'patient',
    },
    active: {
      type: 'boolean',
      description: 'Status ativo do usuário',
      default: true,
    },
    birthDate: {
      type: 'string',
      format: 'date',
      description: 'Data de nascimento do usuário',
    },
    sex: {
      type: 'string',
      description: 'Sexo do usuário',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora da criação do usuário',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora da última atualização do usuário',
    },
  },
};
