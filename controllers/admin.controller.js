const productModel = require("../models/products.model")
const adminModel = require("../models/admin.model")

const validationResult = require("express-validator").validationResult
exports.getAdd = (req , res, next) =>{
    res.render("add-product", {
        validationErrors : req.flash("validationErrors"),
        isUser : true,
        isAdmin : true,
        title: "Add Product",
        validationErrorsImage : req.flash("validationErrorsImage")
    })
}

exports.postAdd = (req , res , next)=>{

    let data={
        name : req.body.name,
        image : req.file.filename,
        price : req.body.price,
        description : req.body.description,
        category:req.body.category
    }
    
    productModel.addProduct(data)
    req.flash("validationErrorsImage" , validationResult(req).array)
    res.render("add-product",{
        validationErrors : req.flash("validationErrors"),
        isUser : true,
        isAdmin : true,
        title: "Add Product",
        validationErrorsImage : req.flash("validationErrorsImage")
    })
}


exports.getManage = (req , res , next)=>{
    let Email = req.query.email
    let Status = req.query.status
        if(Email){
            adminModel.getOrdersByEmail(Email).then((items)=>{

    
                res.render("manage-orders" , {
                    orders: items,
                    title : "Manage Orders",
                    isUser : true,
                    isAdmin : true,
            
                })
            })
        }
        else if(Status){
            adminModel.getOrdersByStatus(Status).then((items)=>{

    
                res.render("manage-orders" , {
                    orders: items,
                    title : "Manage Orders",
                    isUser : true,
                    isAdmin : true,
            
                })
            })
        }
        
        else{
    adminModel.getOrders().then((items)=>{

    
    res.render("manage-orders" , {
        orders: items,
        title : "Manage Orders",
        isUser : true,
        isAdmin : true,

    })
})}
}

exports.postManage =(req,res,next)=>{
    adminModel.postStatus(req.body.orderId , req.body.status).then(()=>{
        adminModel.getOrders().then((items)=>{
        res.render("manage-orders" , {
            orders: items,
            title : "Manage Orders",
            isUser : true,
            isAdmin : true,
        })
        })
    })
} 

