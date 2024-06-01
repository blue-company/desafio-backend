import express, { Response } from "express";
import cors from "cors";
import { Connection } from "./database/configuration";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`);
});

const connection:Connection = new Connection();

connection.connected.connect();

app.get('/users', function(req, res){
  connection.connected.query('SELECT * FROM users', function(error, results){
    if(error){
      throw error
    }

    res.send(results.map((item: { name: any; email: any; }) => ({
      name: item.name,
      email: item.email
    })))
  });

   
})


