const welcomeMessage = (req, res, next) => {
  res.status(200).json({ Message: "Welcome to Our News Website" }) // DON'T NEED THIS. SEE README
}

module.exports = welcomeMessage