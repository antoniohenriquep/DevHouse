const {Router} = require('express')
const {dashboardShow} = require('../controllers/DashboardController')

const routes = new Router()

routes.get('/',dashboardShow)

module.exports = routes