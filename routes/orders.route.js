const orderController = require('../controllers/orders.controller')
const router = require('express').Router()
const bodyParser = require('body-parser')
const bd= bodyParser.urlencoded({
    extended:true
})


const cartController = require("../controllers/cart.controller")
const Guard = require("./Guards/auth.guard")


router.get('/', Guard.isAuth , Guard.notAdmin , bd , orderController.getOrders )
router.post('/orderOne' , Guard.isAuth , bd , orderController.postOrderOne)
router.post('/orderAll' , Guard.isAuth , bd , orderController.postOrderAll)
router.post('/cancle', Guard.isAuth , bd , orderController.postCancle)

module.exports = router