const connection = require("../db/connection.js");

const fetchArticles = () => {
  return connection("articles").select("*");
};

const fetchArticleByArticleID = article_id => {
  return connection.select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .count({ comment_count: 'comments.article_id' })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(([ article ]) => {
      if (!article) {
        return Promise.reject({
          HTTP_Error: "404: Not Found",
          Message: "Valid Input Syntax But Does Not Exist"
        });
      } else {
        return article;
      }
    });
};

module.exports = { fetchArticles, fetchArticleByArticleID };
