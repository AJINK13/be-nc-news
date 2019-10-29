const { fetchArticles } = require("../models/articlesModel.js");

const getArticles = (req, res, next) => {
  fetchArticles().then(articles => {
    res.status(200).json({ articles });
  });
};

module.exports = { getArticles }