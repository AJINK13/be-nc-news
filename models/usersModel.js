const connection = require("../db/connection.js");

const fetchUsers = () => {
  return connection("users").select("*");
};

const fetchUserByUsername = username => {
  return connection("users")
    .first("*")
    .where("username", username)
    .then(username => {
      if (!username) {
        return Promise.reject({
          status: 404,
          message: "Not Found: Valid Input Syntax But Does Not Exist"
        });
      } else {
        return username
      }
    });
};

module.exports = { fetchUsers, fetchUserByUsername };
