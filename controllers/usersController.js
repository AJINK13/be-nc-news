const { fetchUsers, fetchUser } = require("../models/usersModel.js")

const getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      console.log(users)
      res.status(200).json({ users })
    })
    .catch(err => next(err))
}

const getUserByUsername = (req, res, next) => {
  const { username } = req.params
  fetchUser(username)
    .then(user => {
      res.status(200).json({ user })
    })
    .catch(err => next(err))
}

module.exports = { getUsers, getUserByUsername }
