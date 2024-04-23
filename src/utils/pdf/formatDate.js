function formatDate(date) {
  if (!date) {
    return "";
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return "";
  }
  return parsedDate.toLocaleDateString("pt-BR");
}

function formatDateToDescriptiveString(date) {
  if (!date) {
    return "";
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return "";
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  return parsedDate.toLocaleDateString("pt-BR", options);
}

function formatTime(time) {
  if (!time) {
    return "";
  }
  const parsedTime = new Date(`1970-01-01T${time}Z`);
  if (isNaN(parsedTime)) {
    return "";
  }
  return parsedTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function getDuration(initialTime, endTime) {
  if (!initialTime || !endTime) {
    return "";
  }
  const start = new Date(`1970-01-01T${initialTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  if (isNaN(start) || isNaN(end)) {
    return "";
  }
  const durationMs = end.getTime() - start.getTime();
  const duration = new Date(durationMs);
  return duration.toISOString().substr(11, 8);
}

function calculateAge(birthDate) {
  if (!birthDate) {
    return "";
  }
  const birth = new Date(birthDate);
  if (isNaN(birth)) {
    return "";
  }
  const ageDiffMs = Date.now() - birth.getTime();
  const ageDate = new Date(ageDiffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  formatDate,
  formatTime,
  calculateAge,
  getDuration,
  formatDateToDescriptiveString,
};
