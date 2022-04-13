const bodyParser = require('body-parser')
const bd= bodyParser.urlencoded({
    extended:true
})

const Guard = require("./Guards/admin.guard")

const router = require("express").Router()
const homeController = require('../controllers/home.controller')
router.get('/' ,homeController.getHome)
router.post('/delete' , Guard , bd , homeController.deleteProduct)
module.exports = router