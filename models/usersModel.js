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
          HTTP_Error: "404: Not Found",
          Message: "Valid Input Syntax But Does Not Exist"
        });
      } else {
        return username
      }
    });
};

module.exports = { fetchUsers, fetchUserByUsername };
