const routeErr = (req, res, next) => {
  res.status(404).json({ Message: "Not Found: Invalid Route" })
}

module.exports = routeErr
