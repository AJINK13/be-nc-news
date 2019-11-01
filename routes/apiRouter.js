const apiRouter = require("express").Router()
const topicsRouter = require("../routes/topicsRouter.js")
const usersRouter = require("../routes/usersRouter.js")
const articlesRouter = require("../routes/articlesRouter.js")
const commentsRouter = require("../routes/commentsRouter.js")
const getEndpoints = require("../controllers/apiController.js")
const methodErr = require("../errors/methodErr.js")

apiRouter
  .route("/")
  .get(getEndpoints)
  .all(methodErr)

apiRouter.use("/topics", topicsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/articles", articlesRouter)
apiRouter.use("/comments", commentsRouter)

module.exports = apiRouter
