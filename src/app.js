require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require("./middlewares/errorHandler");
const sequelize = require("./config/database");
const app = express();

app.use(express.json());
sequelize.sync();

app.use(userRoutes);
app.use(appointmentRoutes);

app.use(errorHandler);

module.exports = app;
