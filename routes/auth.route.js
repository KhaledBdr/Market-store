const router = require('express').Router()
const bodyParser = require('body-parser')
const bd = bodyParser.urlencoded(extended=true)
const authController = require("../controllers/auth.controller")
const check = require('express-validator').check
const guards = require('./Guards/auth.guard')

router.get('/signup' , guards.notAuth, authController.getSignUp)
 
router.post(
    "/signup",guards.notAuth ,bd,

    check('name').notEmpty().withMessage("Required field ,Please Enter Your Name"),
    check('email').notEmpty().withMessage("Required field , Please Enter Your Email")
                 .isEmail().withMessage(" Format Type Error"),
    check('password').notEmpty().withMessage(" Password is Required ").isLength({ min:8}).withMessage(" Password can't be less than 8 characters  for more secuirty"),
    check('confirmpassword').custom((value , {req}) =>{
        if(value === req.body.password) return true
        else throw(" Passwords are differents")
        
    }),

    authController.postSignup

)

router.get('/login' ,guards.notAuth , authController.getLogin)

router.post('/login' , guards.notAuth, bd ,
check('email').notEmpty()
              .withMessage(" Email is Required")
              .isEmail()
              .withMessage("Invalid Format For Email    Your Mail Must be like  mo******@***mail.com "),
check('password').notEmpty()
                 .withMessage(" Password Can't be Impty")
                 .isLength({min:8})
                 .withMessage("Password Must Be More Than 8 characters"),


authController.postLogin)

router.all('/logout' , guards.isAuth, authController.logout)   

module.exports = router