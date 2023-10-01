const AuthRoute = require('express').Router()

const Auth = require('../Controller/auth.controller')


AuthRoute.post('/signup' , Auth.signup)
AuthRoute.post('/signin' , Auth.signIn)


module.exports = AuthRoute