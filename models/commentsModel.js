const connection = require("../db/connection.js")

const fetchComments = () => {
  return connection.select("*").from("comments")
}

const updateComment = (comment_id, patchVote) => {
  let updateVote = patchVote.inc_votes
  if (!patchVote.inc_votes) updateVote = 0
  if (Object.keys(patchVote).length !== 1) {
    return Promise.reject({
      status: 400,
      message:
        "Bad Request: 'inc_votes: value' Must Be The Only Key-Value Pair On Request Body"
    })
  }
  return connection
    .from("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", updateVote)
    .returning("*")
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          message: "Not Found: Valid Input Syntax for comment_id But Does Not Exist"
        })
      }
      return comment
    })
}

const removeComment = comment_id => {
  return connection
    .first("*")
    .from("comments")
    .where("comments.comment_id", comment_id)
    .then(comment_id => {
      if (!comment_id) {
        return Promise.reject({
          status: 404,
          message: "Not Found: Valid Input Syntax for comment_id But Does Not Exist"
        })
      }
    })
    .then(() => {
      return connection
        .first("*")
        .from("comments")
        .where("comments.comment_id", comment_id)
        .del()
    })
}

module.exports = { fetchComments, updateComment, removeComment }
