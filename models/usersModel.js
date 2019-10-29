const connection = require("../db/connection.js");

const fetchUsers = () => {
  return connection("users").select("*");
};

module.exports = fetchUsers;
