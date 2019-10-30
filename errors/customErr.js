const customErr = (err, req, res, next) => {
  if (err) {
    res.status(err.status).json({ Message: err.message })
  }
}

module.exports = customErr
