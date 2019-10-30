const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID
} = require("../controllers/articlesController.js");

articlesRouter.route("/").get(getArticles);
articlesRouter
  .route("/:article_id")
  .get(getArticleByArticleID)
  .patch(patchArticleByArticleID);

module.exports = articlesRouter;
