const topicsRouter = require("express").Router()
const getTopics = require("../controllers/topicsController.js")
const methodErr = require("../errors/methodErr.js")

topicsRouter.route("/").get(getTopics).all(methodErr)

module.exports = topicsRouter
