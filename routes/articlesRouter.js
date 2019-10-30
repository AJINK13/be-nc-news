const articlesRouter = require("express").Router()
const {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID,
  postCommentByArticleID
} = require("../controllers/articlesController.js")

articlesRouter.route("/").get(getArticles)

articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(patchArticleByArticleID)

articlesRouter.route("/:article_id/comments").post(postCommentByArticleID)

module.exports = articlesRouter
