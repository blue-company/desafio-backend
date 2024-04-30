require('dotenv').config();

const app = require('./api');

const port = process.env.API_PORT || 3000;

app.listen(port, () => console.log('listening port on', port));
