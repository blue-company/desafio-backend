require("dotenv").config();
const CustomError = require("../utils/customError");

function errorHandler(err, req, res, next) {
  if (process.env.LOGGING_ERROR_CONSOLE == "true") {
    console.error(`Error in file: ${__filename.replace(/\\/g, "/")}`, err);
  }
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    const message = err.message || "Ocorreu um erro interno no servidor.";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      error: message,
      status: statusCode,
    });
  }
}

module.exports = errorHandler;
