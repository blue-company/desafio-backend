const express = require('express')
const routes = require("./routes.js")




const app = express();
app.use(express.json());

app.use(routes)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });