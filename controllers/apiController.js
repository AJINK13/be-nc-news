const endpoints = require("../endpoints.json")

const getEndpoints = (req, res, next) => {
  // console.log(endpoints)
  res.status(200).json({ endpoints })
}

module.exports = getEndpoints
