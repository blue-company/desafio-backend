const moment = require("moment");

function formatDate(date) {
  let formattedDate;
  const regex1 = /^\d{2}\/\d{2}\/\d{2}$/; // DD/MM/YY
  const regex2 = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
  const regex3 = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

  if (regex1.test(date) || regex2.test(date)) {
    formattedDate = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  } else if (regex3.test(date)) {
    formattedDate = date;
  } else {
    throw new Error("Invalid date format");
  }
  return formattedDate;
}

module.exports = formatDate;
