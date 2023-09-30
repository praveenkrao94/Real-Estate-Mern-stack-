const UserRouter = require('express').Router()
const User = require('../models/User.Model')
const userHandlers = require('../Controller/User.controller')

UserRouter.get('/test' , userHandlers.test)
UserRouter.get('/test2' , userHandlers.test2)

module.exports = UserRouter