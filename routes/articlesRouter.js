const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleByArticleID
} = require("../controllers/articlesController.js");

articlesRouter.route("/").get(getArticles);
articlesRouter.route("/:article_id").get(getArticleByArticleID);

module.exports = articlesRouter;
