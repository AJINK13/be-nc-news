const connection = require("../db/connection.js")

const fetchArticles = () => {
  return connection("articles").select("*")
}

const fetchArticleByArticleID = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          message: "Not Found: Valid Input Syntax But Does Not Exist"
        })
      } else {
        return article
      }
    })
}

const updateArticleByArticleID = (article_id, patchVote) => {
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
    .from("articles")
    .where("articles.article_id", article_id)
    .increment("votes", updateVote)
    .returning("*")
    .then(([article]) => {
      if (!article) {
        return Promise.reject({
          status: 404,
          message: "Not Found: Valid Input Syntax But Does Not Exist"
        })
      } else {
        return article
      }
    })
}

module.exports = {
  fetchArticles,
  fetchArticleByArticleID,
  updateArticleByArticleID
}
