const productsModel = require('../models/products.model')
exports.getHome = (req,res,next)=>{ 
    
    // 1-  get Products
    // 2-  Render index.ejs
    // get category from url
    // if category && category !== all
    // filter
    // else   
    // render all

    let categoryDomain = ['phones' , 'laptop' , 'clothes' , 'test' , 'accessories']
    let category = req.query.category
if(category && categoryDomain.includes(category)){
    productsModel.getProductsByCategory(category).then(products=>{
       res.render('index',{
        products :products,
        isUser: req.session.userId,
        validationErrors :req.flash("validationErrors")[0],
        isAdmin : req.session.isAdmin,
        title : `Home`
    })

})
}else{
    productsModel.getAllProducts().then(products=>{
        res.render('index',{
            products :products , 
            title : "Home",
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            validationErrors :req.flash("validationErrors")[0]
        })
    })
}
}

exports.deleteProduct = (req , res , next )=>{
    console.log(req.body.id)
    productsModel.deleteProduct(req.body.id).then(()=>{

        productsModel.getAllProducts().then(products=>{
        res.render('index',{
            products :products , 
            title : "Home",
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            validationErrors :req.flash("validationErrors")[0]
        })
    })
    })
}