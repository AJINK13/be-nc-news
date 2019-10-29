const topicsRouter = require('express').Router()
const getTopics = require('../controllers/topicController.js')

topicsRouter.route('/').get(getTopics)





module.exports = topicsRouter