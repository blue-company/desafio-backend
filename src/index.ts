import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

app.use("/user", userRoutes)


