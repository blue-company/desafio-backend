const Sequelize = require("sequelize")

const dbConfig = require('../dbConfig/databaseConfig.js')

const connection = new Sequelize(dbConfig);


connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


module.exports = connection;