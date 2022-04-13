const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult
exports.getSignUp = (req,res,next)=>{
    res.render('signup' , {
        title:"Sign Up",
        validationErrors : req.flash('validationError'),
        isUser: false,
        isAdmin : false
    })
}

exports.postSignup = (req,res,next)=>{

    if( validationResult(req).isEmpty()){
    authModel.createNewUser(req.body.name , req.body.email,req.body.password).then(()=>
    res.render(
        res.redirect('/login'),
        title = "Login",
        isUser= req.session.userId
    )).catch(err =>{
        console.log(err)    
        res.redirect('/signup'),{
            title : "Sign Up",
        isUser: req.session.userId

            }   
    })}
    else{
        req.flash('validationError', validationResult(req).array())
        res.redirect('/signup')
        isUser: req.session.userId
    }
}

exports.getLogin = (req,res,next)=>{
    const loginError = req.flash('ErrorsArray')
    res.render('login',{
        err1: loginError[0],
        title: "Login Page",
        validationErrors :req.flash('validationError'),
        isUser: false,
        isAdmin : false
    })
}

exports.postLogin = (req,res,next)=>{

    if(validationResult(req).isEmpty()){
        let email = req.body.email
    authModel.login(req.body.email , req.body.password).then((result)=>{
        req.session.email = email
        req.session.userId = result.id
        req.session.isAdmin = result.isAdmin
        res.redirect('/')
    }).catch(err =>{
        req.flash('ErrorsArray' , err)
        console.log(err)
        res.redirect('/login')
        isUser: req.session.userId
    })}
    else{
        req.flash('validationError' , validationResult(req).array())
        res.redirect('/login')
        isUser: req.session.userId
    }
}

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
    res.redirect('/')
})
}