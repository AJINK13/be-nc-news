const articlesRouter = require("express").Router();
const { getArticles } = require("../controllers/articlesController.js");

articlesRouter.route("/").get(getArticles);

module.exports = articlesRouter;
