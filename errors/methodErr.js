const methodErr = (req, res, next) => {
  res.status(405).json({ Message: "Method Not Allowed" })
}

module.exports = methodErr
