import express from 'express'
import home from './Routes/index';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', home)


app.listen(port, () =>{
    console.log(`Servidor rodando na porta: ${port}`);
    
})