const { fetchUsers, fetchUserByUsername } = require("../models/usersModel.js");

const getUsers = (req, res, next) => {
  fetchUsers().then(users => {
    res.status(200).json({ users });
  });
};

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => next(err));
};

module.exports = { getUsers, getUserByUsername };
