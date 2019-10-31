const psqlErr = (err, req, res, next) => {
  console.log(err)
  const psqlCode = {
    "22P02": {
      status: 400,
      message: "Bad Request: Invalid Input Syntax - Expected Integer"
    },
    "23503": {
      status: 404,
      message: "Not Found: Valid Input Syntax For article_id But Does Not Exist"
    },
    "42703": {
      status: 400,
      message: "Bad Request: Column For sortBy Query Does Not Exist"
    }
  }
  const psqlError = psqlCode[err.code]
  if (psqlError) {
    res.status(psqlError.status).json({ Message: psqlError.message })
  } else next(err)
}

module.exports = psqlErr

// DECIDED TO MAKE CUSTOM ERROR MESSAGES RATHER THAN PSQL ERROR MESSAGES
