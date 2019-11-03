const {
  fetchArticles,
  fetchArticle,
  updateArticle,
  addComment,
  fetchComments
} = require("../models/articlesModel.js")

const getArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit} = req.query
  fetchArticles(sort_by, order, author, topic, limit)
    .then(articles => {
      res.status(200).json({ articles })
    })
    .catch(err => next(err))
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
  addComment(article_id, comment)
    .then(comment => {
      res.status(201).json({ comment })
    })
    .catch(err => next(err))
}

const getCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params
  const { sort_by, order } = req.query
  fetchComments(article_id, sort_by, order)
    .then(comments => {
      res.status(200).json({ comments })
    })
    .catch(err => next(err))
}

module.exports = {
  getArticles,
  getArticleByArticleID,
  patchArticleByArticleID,
  postCommentByArticleID,
  getCommentsByArticleID
}
