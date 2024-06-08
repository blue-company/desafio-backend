const express = require('express')
const routes = require("./routes.js");
const dotenv = require('dotenv')
dotenv.config()
require('./database/index.js');




const app = express();
app.use(express.json());

app.use(routes)

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port`,PORT);
  });