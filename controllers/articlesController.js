const {
  fetchArticles,
  fetchArticleByArticleID,
  updateArticleByArticleID
} = require("../models/articlesModel.js");

const getArticles = (req, res, next) => {
  fetchArticles().then(articles => {
    res.status(200).json({ articles });
  });
};

const getArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByArticleID(article_id)
    .then(article => {
      res.status(200).json({ article });
    })
    .catch(err => next(err));
};

const patchArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const patchVote = req.body;
  updateArticleByArticleID(article_id, patchVote)
    .then(article => {
      res.status(200).json({ article });
    })
    .catch(err => next(err));
};

module.exports = {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID
};
