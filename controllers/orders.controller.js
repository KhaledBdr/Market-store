const orderModel = require('../models/orders.model')
exports.getOrders = (req , res, next)=>{
    orderModel.getItemsFromDB(req.session.userId).then((items)=>{ 
          
      res.render(
            'orders',{
                title: "Orders Page",
                isUser:true,
                isAdmin : req.session.isAdmin,
                items : items
            })
        }).catch(err => console.log(err))
    }

exports.postOrderOne=(req , res,next)=>{
    orderModel.OrderItem(req.session.userId , req.body.ProductId).then(()=>{
        res.redirect('/orders')
    }).catch(err => console.log(err))
}


exports.postOrderAll = (req , res,next)=>{
    orderModel.orderAll(req.session.userId).then(()=>{
        res.redirect('/orders')
    }).catch(err =>  console.log(err))
}
exports.postCancle =(req,res,next)=>{
    orderModel.cancle(req.body.order_Id).then(()=>{
        res.redirect('/orders')
    }).catch(err => console.log(err))
}