const throwError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

const statusMap = {
  "-1": "CANCELADO",
  0: "MARCADA",
  1: "CONCLUIDO",
};

function getStatusString(statusCode) {
  return statusMap[statusCode] || "Status Desconhecido";
}

function getStatusNumber(statusString) {
  const statusNumber = Object.keys(statusMap).find((key) => statusMap[key] === statusString);
  return statusNumber !== undefined ? parseInt(statusNumber) : null;
}
function formatStatus(status) {
  if (typeof status === "string") {
    return getStatusNumber(status);
  } else if (typeof status === "number") {
    return getStatusString(status);
  }
  return false;
}
function validateStatus(status) {
  if (typeof status === "string") {
    return getStatusNumber(status) !== null;
  } else if (typeof status === "number") {
    return statusMap.hasOwnProperty(status.toString());
  }
  return throwError(
    "Status inválido fornecido. Os valores de status podem ser 0 para 'MARCADA', 1 para 'CONCLUIDO' e -1 para 'CANCELADO'. Os valores também podem ser em string 'MARCADA', 'CANCELADO' ou 'CONCLUIDO'.",
    400
  );
}

function validateAppointmentDetails(details) {
  const allowedProperties = [
    "userId",
    "doctorName",
    "specialtyName",
    "appointmentDate",
    "appointmentInitialTime",
    "appointmentFinalTime",
    "reason",
    "status",
  ];
  const detailKeys = Object.keys(details);
  for (let key of detailKeys) {
    if (!allowedProperties.includes(key)) {
      throw new Error(`Propriedade inválida: ${key}`, 400);
    }
  }

  const { userId, doctorName, specialtyName, appointmentDate, appointmentInitialTime, appointmentFinalTime, reason, status } = details;

  if (!userId) {
    throwError("O ID do usuário não pode ser vazio.", 400);
  }

  if (!doctorName) {
    throwError("O nome do médico não pode ser vazio.", 400);
  }

  if (!specialtyName) {
    throwError("O nome da especialidade não pode ser vazio.", 400);
  }

  if (!appointmentDate) {
    throwError("A data da consulta não pode ser vazia.", 400);
  }

  if (!appointmentInitialTime || !appointmentFinalTime) {
    throwError("O horário inicial e final da consulta não podem ser vazios.", 400);
  }

  if (!reason) {
    throwError("O motivo da consulta não pode ser vazio.", 400);
  }

  if (!status) {
    throwError("O status da consulta não pode ser vazio.", 400);
  }
  const currentDate = new Date();
  const appointmentDateObject = new Date(appointmentDate);

  if (appointmentDateObject < currentDate) {
    throwError("A data da consulta não pode ser anterior à data atual.", 400);
  }
}

module.exports = {
  validateAppointmentDetails,
  formatStatus,
  validateStatus,
  getStatusNumber,
  getStatusString,
};
