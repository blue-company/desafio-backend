require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/index');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./config/database');
const app = express();

app.use(express.json());
sequelize.sync();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userRoutes);
app.use(appointmentRoutes);
app.use(doctorRoutes);
app.use(errorHandler);

module.exports = app;
