const serverErr = (err, req, res, next) => {
    if (err) {
      res.status(500).json({ Message: "I didn't account for this error :(" })
    } 
  }
  
  module.exports = serverErr