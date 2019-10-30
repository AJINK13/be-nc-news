const psqlErr = (err, req, res, next) => {
  const psqlCode = {
    "22P02": {
      status: 400,
      message: "Bad Request: Invalid Input Syntax - Expected Integer"
    }
  }
  const psqlError = psqlCode[err.code]
  if (psqlError) {
    res.status(psqlError.status).json({ Message: psqlError.message })
  } else next(err)
}

module.exports = psqlErr

// DECIDED TO MAKE CUSTOM ERROR MESSAGES RATHER THAN PSQL ERROR MESSAGES
