const {Router} = require('express')
const {houseStore, houseIndex, houseUpdate, houseDestroy} = require('../controllers/HouseController')
const multer = require('multer')

const uploadConfig = require('../config/upload')
const upload = multer(uploadConfig)

const routes = new Router()


routes.get('/',houseIndex)
routes.post('/', upload.single('thumbnail'),houseStore)
routes.put('/:id',upload.single('thumbnail'),houseUpdate)
routes.delete('/',houseDestroy)

module.exports = routes