const connection = require("../db/connection.js");

const fetchArticles = () => {
  return connection("articles").select("*");
};

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
        });
      } else {
        return article;
      }
    });
};

const updateArticleByArticleID = (article_id, patchVote) => {
  const updateVote = patchVote.inc_votes;
  return connection
  .from("articles")
  .where("articles.article_id", article_id)
  .increment("votes", updateVote)
  .returning("*")
  .then(([article]) => {
    return article
  })
};

module.exports = {
  fetchArticles,
  fetchArticleByArticleID,
  updateArticleByArticleID
};
