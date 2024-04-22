const express = require("express");
const UserController = require("../controllers/userController.js");
const auth = require("../middlewares/auth.js");

const routes = express.Router();

routes.get("/user", UserController.getAll);
routes.get("/user/:id", UserController.getUserById);
routes.put("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);
routes.post("/login", UserController.login);
routes.post("/register", UserController.register);

module.exports = routes;
