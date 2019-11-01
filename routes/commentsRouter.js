const commentsRouter = require("express").Router()
const { getComments, patchCommentByCommentID } = require("../controllers/commentsController.js")
const methodErr = require("../errors/methodErr.js")

commentsRouter
  .route("/")
  .get(getComments)
  .all(methodErr)

commentsRouter.route("/:comment_id").patch(patchCommentByCommentID)

module.exports = commentsRouter
