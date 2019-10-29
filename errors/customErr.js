const customErr = (err, req, res, next) => {
  if (err) {
    res
      .status(404)
      .json({
        HTTP_Error: "404: Not Found",
        Message: "Valid Input Syntax But Does Not Exist"
      });
  }
};

module.exports = customErr;
