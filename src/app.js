require('express-async-errors');
const express = require('express');
const userRouter = require('./routes/userRouter');
const appointmentRouter = require('./routes/appointmentRouter');
const errorMiddleware = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use('/users', userRouter);

app.use('/appointments', appointmentRouter);

app.use(errorMiddleware);

module.exports = app;
