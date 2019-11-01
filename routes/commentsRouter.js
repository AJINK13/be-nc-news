const commentsRouter = require("express").Router()
const {
  getComments,
  patchCommentByCommentID,
  deleteCommentByCommentID
} = require("../controllers/commentsController.js")
const methodErr = require("../errors/methodErr.js")

commentsRouter
  .route("/")
  .get(getComments)
  .all(methodErr)

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentByCommentID)
  .delete(deleteCommentByCommentID)
  .all(methodErr)

module.exports = commentsRouter
