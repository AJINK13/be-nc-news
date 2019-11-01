const apiRouter = require("express").Router()
const topicsRouter = require("../routes/topicsRouter.js")
const usersRouter = require("../routes/usersRouter.js")
const articlesRouter = require("../routes/articlesRouter.js")
const commentsRouter = require("../routes/commentsRouter.js")

apiRouter.get("/", (req, res, next) => {
  res.status(200).json({ Message: "Welcome to Our News Website" }) // DON'T NEED THIS. SEE README
})

apiRouter.use("/topics", topicsRouter)
apiRouter.use("/users", usersRouter)
apiRouter.use("/articles", articlesRouter)
apiRouter.use("/comments", commentsRouter)

module.exports = apiRouter
