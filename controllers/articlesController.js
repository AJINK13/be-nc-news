const {
  fetchArticles,
  fetchArticle,
  updateArticle,
  addComment
} = require("../models/articlesModel.js")

const getArticles = (req, res, next) => {
  fetchArticles().then(articles => {
    res.status(200).json({ articles })
  })
}

const getArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params
  fetchArticle(article_id)
    .then(article => {
      res.status(200).json({ article })
    })
    .catch(err => next(err))
}

const patchArticleByArticleID = (req, res, next) => {
  const { article_id } = req.params
  const patchVote = req.body
  updateArticle(article_id, patchVote)
    .then(article => {
      res.status(200).json({ article })
    })
    .catch(err => next(err))
}

const postCommentByArticleID = (req, res, next) => {
  const { article_id } = req.params
  const comment = req.body
  addComment(article_id, comment).then(comment => {
    console.log(comment)
    res.status(201).json({ comment })
  })
}

module.exports = {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID,
  postCommentByArticleID
}
