const statusMap = {
  "-1": "CANCELADO",
  0: "MARCADO",
  1: "CONCLUIDO",
};
function getStatusString(statusCode) {
  return statusMap[statusCode] || "Status Desconhecido";
}

function getStatusNumber(statusString) {
  const statusNumber = Object.keys(statusMap).find((key) => statusMap[key] === statusString);
  return statusNumber !== undefined ? parseInt(statusNumber) : null;
}

function validateStatus(status) {
  if (typeof status === "string") {
    return getStatusNumber(status) !== null;
  } else if (typeof status === "number") {
    return statusMap.hasOwnProperty(status.toString());
  }
  return false;
}

module.exports = {
  getStatusString,
  getStatusNumber,
  validateStatus,
};
