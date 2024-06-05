const Sequelize = require("sequelize")

const dbConfig = require('../config/config.js')

const connection = new Sequelize(dbConfig);
connection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = require('../models/userModel.js')
User.init(connection)



module.exports = connection;