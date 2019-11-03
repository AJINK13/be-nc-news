const createMessage = err => {
  return err.message.split(" - ")[1]
}

const psqlErr = (err, req, res, next) => {
  const psqlCode = {
    "22P02": {
      status: 400,
      message: "Bad Request:" + " " + createMessage(err)
    },
    "23503": {
      status: 404,
      message: "Not Found: Valid Input Syntax For article_id But Does Not Exist"
    },
    "42703": {
      status: 400,
      message: "Bad Request:" + " " + createMessage(err)
    }
  }
  const psqlError = psqlCode[err.code]
  if (psqlError) {
    res.status(psqlError.status).json({ Message: psqlError.message })
  } else next(err)
}

module.exports = psqlErr
