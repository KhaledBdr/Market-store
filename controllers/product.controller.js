const productsModel = require('../models/products.model')
exports.getProduct = (req,res,next)=>{

    // Get Id
    // Connect To DB
    // Get Product Details
    let id = req.params.id

    productsModel.getProductsById(id).then(product=>{
        res.render('product' , {
         
            title: `Products Page` ,
            product :product,
            isUser: true,
            isAdmin : req.session.isAdmin
        })
    })
   
}

exports.getFirstProduct = (req ,res,next)=>{
     productsModel.getFirstProducts().then(product=>{
    res.render('product',{
        title : "Product 1",
        product : product,
        isUser: true,
        isAdmin : req.session.isAdmin
    })
})
}

