const {
  fetchArticles,
  fetchArticle,
  updateArticle,
  addComment,
  fetchComments
} = require("../models/articlesModel.js")

const getArticles = (req, res, next) => {
  const { sortBy, order, ...otherQuery } = req.query
  fetchArticles(sortBy, order, otherQuery).then(articles => {
    console.log(articles)
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
  const { sortBy, order } = req.query
  fetchComments(article_id, sortBy, order)
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
