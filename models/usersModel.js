const connection = require("../db/connection.js");

const fetchUsers = () => {
  return connection("users").select("*");
};

const fetchUserByUsername = username => {
  return connection("users")
    .first("*")
    .where("username", username)
};

module.exports = { fetchUsers, fetchUserByUsername };
