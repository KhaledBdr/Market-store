const cartModel = require("../models/cart.model")
const validationResult = require("express-validator").validationResult


exports.getCart = (req , res, next)=>{
    cartModel.getItemsFromDB(req.session.userId).then(items=>{
        res.render(
            'cart',{
                title: "Cart Page",
                items: items,
                isUser:true,
                isAdmin : req.session.isAdmin,
                validationResult : validationResult,
                AmountPostErrors : req.flash("AmountPostErrors")
            })
    }).catch(err=> console.log(err))
}

exports.postCart = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        cartModel.addNewItem(req.body.productId , {
            name: req.body.name,
            price: req.body.price,
            productId: req.body.productId,
            userId : req.session.userId,
            email : req.session.email,
            amount: req.body.amount,
            timestamp : Date.now()
        }).then(()=>{
            res.redirect("/cart")
        }).catch(err =>{
            console.log(err)
        })
    }else{
        req.flash("validationErrors" , validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.postSave = (req,res,next)=>{
    if(validationResult(req).isEmpty()){
        
        cartModel.editItem(req.body.cartId , {
                amount : req.body.amount,
                timestamp : Date.now(),
            }).then(()=> res.redirect ('/cart')).catch(err=> console.log(err))
       }else{
        req.flash("AmountPostErrors" , validationResult(req).array())
        res.redirect("/cart")
    }
}
exports.postDelete = (req,res,next)=>{
  
    cartModel.deleteItem(req.session.userId, req.body.cartId)
             .then(()=>{
                 res.redirect('/cart')
             }).catch(err => console.log(err))
}

exports.postDeleteAll = (req,res,next)=>{
    cartModel.deleteAll(req.session.userId).then(()=>{
        res.redirect('/cart')
    }).catch(err => console.log(err))
}


