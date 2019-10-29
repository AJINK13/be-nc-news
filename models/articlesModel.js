const connection = require("../db/connection.js")

const fetchArticles = () => {
    return connection("articles").select("*")
}

module.exports = { fetchArticles }