const connection = require("../db/connection.js")

const fetchArticles = (sort_by, order, { author, topic }) => {
  if (order !== undefined && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      message: "Bad Request: Invalid order Query"
    })
  } else {
    return connection
      .select("articles.*")
      .from("articles")
      .count({ comment_count: "comments.article_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by || "created_at", order || "desc")
      .modify(query => {
        if (author) {
          query.where("articles.author", author)
        } else if (topic) {
          query.where("articles.topic", topic)
        }
      })
      .then(articles => {
        if (!articles.length) {
          if (author) {
            return connection
              .select("*")
              .from("users")
              .where("username", author)
              .then(([user]) => {
                if (!user) {
                  return Promise.reject({
                    status: 404,
                    message: "Not Found: author Does Not Exist"
                  })
                }
                return []
              })
          } else if (topic) {
            return connection
              .select("*")
              .from("topics")
              .where("slug", topic)
              .then(([topic]) => {
                if (!topic) {
                  return Promise.reject({
                    status: 404,
                    message: "Not Found: topic Does Not Exist"
                  })
                }
                return []
              })
          }
        }
        return articles
      })
  }
}

const fetchArticle = article_id => {
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
          message: "Not Found: Valid Input Syntax for article_id But Does Not Exist"
        })
      }
      return article
    })
}

const updateArticle = (article_id, patchVote) => {
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
          message: "Not Found: Valid Input Syntax for article_id But Does Not Exist"
        })
      }
      return article
    })
}

addComment = (article_id, comment) => {
  const newComment = {
    author: comment.username,
    body: comment.body,
    article_id: article_id
  }
  if (Object.keys(comment).length !== 2) {
    return Promise.reject({
      status: 400,
      message:
        "Bad Request: 'username: value' And 'body: value' Must Be The Only Two Key-Value Pairs On Request Body"
    })
  }
  return connection("comments")
    .insert(newComment)
    .returning("*")
    .then(([comment]) => {
      return comment
    })
}

fetchComments = (article_id, sort_by, order) => {
  if (order !== undefined && order !== "asc" && order !== "desc") {
    return Promise.reject({
      status: 400,
      message: "Bad Request: Invalid order Query"
    })
  } else {
    return connection
      .select("*")
      .from("comments")
      .where("article_id", article_id)
      .orderBy(sort_by || "created_at", order || "desc")
      .then(comments => {
        if (!comments.length) {
          return connection
            .select("*")
            .from("articles")
            .where("article_id", article_id)
            .then(([article]) => {
              if (!article) {
                return Promise.reject({
                  status: 404,
                  message:
                    "Not Found: Valid Input Syntax For article_id But Does Not Exist"
                })
              }
              return []
            })
        }
        return comments
      })
  }
}

module.exports = {
  fetchArticles,
  fetchArticle,
  updateArticle,
  addComment,
  fetchComments
}
