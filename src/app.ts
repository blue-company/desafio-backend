import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { ZodError } from "zod";
import swaggerDocs from "../swagger.json";
import { appointmentRoutes } from "./controllers/appointment/routes";
import { userRoutes } from "./controllers/user/routes";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/user", userRoutes);
app.use("/appointment", appointmentRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
);

export { app };
