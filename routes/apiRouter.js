const apiRouter = require('express').Router()

apiRouter.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to Our News Website' })
})




module.exports = apiRouter