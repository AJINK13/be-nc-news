const connection = require("../db/connection.js");

const fetchTopics = () => {
  return connection("topics").select("*");
};

module.exports = fetchTopics;
