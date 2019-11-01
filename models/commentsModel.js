const connection = require("../db/connection.js")

const fetchComments = () => {
  return connection.select("*").from("comments")
}

const updateComment = (comment_id, patchVote) => {
  let updateVote = patchVote.inc_votes
  return connection
    .from("comments")
    .where("comments.comment_id", comment_id)
    .increment("votes", updateVote)
    .returning("*")
    .then(([comment]) => {
        return comment
    })
}

module.exports = { fetchComments, updateComment }
