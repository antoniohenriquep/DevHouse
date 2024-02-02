const {Router} = require('express')

const SessionController = require('../controllers/SessionController')
const HouseController = require('../controllers/HouseController')
const ReserveController = require('../controllers/ReserveController')
const DashboardController = require("../controllers/DashboardController")

const multer = require('multer')

const uploadConfig = require('../config/upload')
const upload = multer(uploadConfig)

const routes = new Router()


//Sessions
routes.get('/sessions',SessionController.index)
routes.post('/sessions',SessionController.store)

//Casas
routes.get('/houses',HouseController.index)
routes.post('/houses', upload.single('thumbnail'),HouseController.store)
routes.put('/houses/:id',upload.single('thumbnail'),HouseController.update)
routes.delete('/houses', HouseController.destroy)

//Dashboard
routes.get('/dashboard',DashboardController.show)

//Reservas
routes.post('/houses/:id/reserve',ReserveController.store)
routes.get('/reserves',ReserveController.index)
routes.delete('/reserves/cancel',ReserveController.destroy)

module.exports = routes