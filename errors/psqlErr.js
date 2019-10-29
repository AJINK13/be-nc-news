const psqlErr = (err, req, res, next) => {
  const psqlCode = ["22P02"];

  if (psqlCode.includes(err.code)) {
    res.status(400).json({
      HTTP_Error: "400: Bad Request",
      Message: "Invalid Input Syntax - Expected Integer"
    });
  } else next(err);
};

module.exports = psqlErr;
