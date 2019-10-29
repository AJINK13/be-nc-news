const usersRouter = require("express").Router();
const getUsers = require("../controllers/usersController.js");

usersRouter.route("/").get(getUsers)

module.exports = usersRouter;
