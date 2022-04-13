const router = require("express").Router()

const bodyParser = require('body-parser')
const bd = bodyParser.urlencoded(extended=true)
const check = require("express-validator").check
const multer = require("multer")

const adminController = require("../controllers/admin.controller")
const adminGuard = require('./Guards/admin.guard')

router.get("/add" ,adminGuard ,  adminController.getAdd)
router.post(
    "/add" ,
     adminGuard ,
        multer({
        storage : multer.diskStorage({
            destination(req , file , cb){
                cb(null , "images")     // cb (err=null , distenation)
            },
            filename(req , file , cb){
                cb(null , Date.now() + "-" + file.originalname)      //cb (err=null , "fileName")
            }
        })
    }).single("image"),
    check("image").custom((value , {req})=>{
        if(req.file) return true
        else throw('Image is Required')
    }).custom((value , {req})=>{
        if(req.file.mimetype.includes("image")) return true
        else throw("Must Be Un Image")
    }) , 
    
    adminController.postAdd
 )


 router.get("/manage",adminGuard , adminController.getManage)
 router.post("/manage" , adminGuard , bd, adminController.postManage )

 router.get("/manage/router")
module.exports = router



// multer({
//     dest : "images"
// }).single("image")