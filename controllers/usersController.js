const fetchUsers = require("../models/usersModel.js");

const getUsers = (req, res, next) => {
  fetchUsers().then(users => {
    res.status(200).json({ users });
  });
};

module.exports = getUsers;
