const router = require('express').Router()
const bodyParser = require('body-parser')
const bd= bodyParser.urlencoded({
    extended:true
})


const check = require('express-validator').check
const cartController = require("../controllers/cart.controller")
const Guard = require("./Guards/auth.guard")

router.get('/' , Guard.isAuth  ,Guard.notAdmin , cartController.getCart)

router.post('/',Guard.isAuth ,  bd , check('amount').notEmpty().withMessage(" Please insert The Amount Field").isInt().withMessage("Please Enter Number").isInt({min:1}).withMessage("Please Enter Number More Than ONE"), cartController.postCart)

router.post('/save' , Guard.isAuth , bd , check('amount').notEmpty().withMessage(" Please insert The Amount Field").isInt().withMessage("Please Enter Number").isInt({min:1}).withMessage("Please Enter Number More Than ONE"), cartController.postSave)

router.post('/delete' , Guard.isAuth , bd , cartController.postDelete)

router.post('/deleteAll' , Guard.isAuth , bd, cartController.postDeleteAll)




module.exports = router