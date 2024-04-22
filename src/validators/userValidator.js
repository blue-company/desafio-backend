const Error = require("../utils/customError");

const DATE_FORMATS = {
  YYYY_MM_DD: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  DD_MM_YYYY: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/,
  DD_MM_YY: /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.]\d\d$/,
};
const USERNAME_LENGTH = { min: 5, max: 30 };
const NAME_LENGTH = { min: 5, max: 60 };
const PASSWORD_LENGTH = { min: 6, max: 30 };
const VALID_ROLES = ["USER", "ADMIN"];

function validateBirthDate(birthDate) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const userBirthDate = new Date(birthDate);

  if (birthDate && userBirthDate > currentDate) {
    throwError("A data de nascimento inválida. Tente novamente com outra data.", 400);
  }
  if (birthDate && !DATE_FORMATS.YYYY_MM_DD.test(birthDate) && !DATE_FORMATS.DD_MM_YYYY.test(birthDate) && !DATE_FORMATS.DD_MM_YY.test(birthDate)) {
    throwError("O formato da data de nascimento é inválido. Formatos aceitos: YYYY-MM-DD, DD/MM/YYYY ou DD/MM/YY.", 400);
  }
}

function validateUsername(username) {
  if ((username && username.length < USERNAME_LENGTH.min) || username.length > USERNAME_LENGTH.max) {
    throwError("O nome de usuário deve ter entre 5 e 16 caracteres.", 400);
  }
}

function validateName(name) {
  if (name.length < NAME_LENGTH.min || name.length > NAME_LENGTH.max) {
    throwError("O nome deve ter entre 5 e 60 caracteres.", 400);
  }
}

function validatePassword(password) {
  if (!password) {
    throwError("A senha não pode ser vazia.", 400);
  }
  if (password.length < PASSWORD_LENGTH.min || password.length > PASSWORD_LENGTH.max) {
    throwError("A senha deve ter entre 6 e 30 caracteres.", 400);
  }
}

function validateSex(sex) {
  if (sex && !["M", "F", "O"].includes(sex.toUpperCase())) {
    throwError("O sexo deve ser 'M', 'F' ou 'O'.", 400);
  }
}
function validateRole(role) {
  if (!VALID_ROLES.includes(role.toUpperCase())) {
    throwError("A role do usuário deve ser 'USER' ou 'ADMIN'.", 400);
  }
}

function validateRequiredFields(details, requiredFields) {
  if (requiredFields.length === 0) {
    let missingFields = [];
    requiredFields.forEach((field) => {
      if (!details[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throwError(
        `Os seguintes campos obrigatórios estão faltando: ${missingFields.join(", ")}. Por favor, preencha todos os campos necessários.`,
        400
      );
    }
  }
}

function validate(details) {
  const { name, username, password, birthDate, sex, role } = details;
  validateBirthDate(birthDate);
  validateUsername(username);
  validateName(name);
  validatePassword(password);
  validateSex(sex);
  validateRole(role);
}
function validateUpdate(details) {
  const { name, username, password, birthDate, sex, role } = details;
  if (birthDate !== undefined) validateBirthDate(birthDate);
  if (username !== undefined) validateUsername(username);
  if (name !== undefined) validateName(name);
  if (password !== undefined) validatePassword(password);
  if (sex !== undefined) validateSex(sex);
  if (role !== undefined) validateRole(role);
}
function validateLogin(details) {
  const { username, password } = details;
  if (!username || !password) {
    throwError("Usuário e senha devem ser definidos", 400);
  }
  validateUsername(username);
  validatePassword(password);
}
function validateRegister(details, requiredFields) {
  if (requiredFields && requiredFields.length > 0) {
    validateRequiredFields(details, requiredFields);
  }
}

function throwError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}
module.exports = {
  validate,
  validateUpdate,
  validateLogin,
  validateRegister,
};
