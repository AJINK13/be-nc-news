const { fetchComments, updateComment } = require("../models/commentsModel.js")

const getComments = (req, res, next) => {
  fetchComments()
    .then(comments => {
      res.status(200).json({ comments })
    })
    .catch(err => next(err))
}

const patchCommentByCommentID = (req, res, next) => {
  const { comment_id } = req.params
  const patchVote = req.body
  updateComment(comment_id, patchVote)
    .then(comment => {
      console.log(comment)
      res.status(200).json({ comment })
    })
    .catch(err => next(err))
}

module.exports = { getComments, patchCommentByCommentID }
