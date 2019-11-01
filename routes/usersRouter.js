const usersRouter = require("express").Router()
const {
  getUsers,
  getUserByUsername
} = require("../controllers/usersController.js")
const methodErr = require("../errors/methodErr.js")

usersRouter
  .route("/")
  .get(getUsers)
  .all(methodErr)

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .all(methodErr)

module.exports = usersRouter
