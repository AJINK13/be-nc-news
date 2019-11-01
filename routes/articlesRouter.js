const articlesRouter = require("express").Router()
const {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID,
  postCommentByArticleID,
  getCommentsByArticleID
} = require("../controllers/articlesController.js")
const methodErr = require("../errors/methodErr.js")

articlesRouter
  .route("/")
  .get(getArticles)
  .all(methodErr)

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(patchArticleByArticleID)
  .all(methodErr)

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleID)
  .get(getCommentsByArticleID)
  .all(methodErr)

module.exports = articlesRouter
