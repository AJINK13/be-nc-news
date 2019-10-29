const connection = require("../db/connection.js");

const fetchArticles = () => {
  return connection("articles").select("*");
};

const fetchArticleByArticleID = article_id => {
  return connection("articles")
    .first("*")
    .where("article_id", article_id)
    .then(article_id => {
      if (!article_id) {
        return Promise.reject({
          HTTP_Error: "404: Not Found",
          Message: "Valid Input Syntax But Does Not Exist"
        });
      } else {
        return article_id;
      }
    });
};

module.exports = { fetchArticles, fetchArticleByArticleID };
