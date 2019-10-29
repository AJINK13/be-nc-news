const apiRouter = require('express').Router()
const topicsRouter = require('../routes/topicsRouter.js')

apiRouter.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to Our News Website' })   // DON'T NEED THIS. SEE README
})

apiRouter.use('/topics', topicsRouter)




module.exports = apiRouter