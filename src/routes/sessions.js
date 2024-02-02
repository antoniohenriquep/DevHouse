const {Router} = require('express')
const sessionStore = require('../controllers/SessionController')

const routes = new Router()

routes.post('/',sessionStore)

module.exports = routes