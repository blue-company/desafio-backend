require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const errorMiddleware = require('./middlewares/error');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swagger_output.json');

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('/appointments', appointmentRouter);

app.use(errorMiddleware);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
