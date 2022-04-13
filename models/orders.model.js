const mongoose = require('mongoose')

const orderScheme = {
    name : String,
    price : Number,
    amount : Number,
    productId : String,
    userId : String,
    timestamp : Number,
    status : String,
    email :String
}
// const schema = mongoose.Schema({
//     name : String,
//     price : Number,
//     amount : Number,
//     productId : String,
//     userId : String,
//     timestamp : Number,
//     userEmail : String
// })

const DB_URL =  "mongodb://localhost:27017/online-shop"
const orderCollection = mongoose.model('order' , orderScheme) 
const  CartItem = mongoose.model("cart" )



exports.OrderItem = (id , cartId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.find({
                    productId : cartId,
                    userId: id
                }).then(item =>{
               let Newitem =  orderCollection({
                name : item[0].name,
                price : item[0].price,
                amount : item[0].amount,
                productId : item[0].productId,
                userId : item[0].userId,
                timestamp : item[0].timestamp,
                email : item[0].email,
                status : "pending" },
                )
               return Newitem.save().then( ()=>{
              return  CartItem.deleteOne({
                    productId : cartId,
                    userId: id
              }) })
                
            })}
        ).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.getItemsFromDB = (userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return  orderCollection.find({  userId : userId   } , {} ,{sort :{ timestamp : 1}} )
        }).then(items=>{
                mongoose.disconnect()
                resolve(items)
            }).catch(err=>{
                mongoose.disconnect()
                 reject(err)
                })
        })
    
}

exports.orderAll = (id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.find({
                userId: id
            }).then(item =>{
           let array = []
                for(let i =0 ; i<item.length ; i++ ){
           let Newitem =  orderCollection({
            name : item[i].name,
            price : item[i].price,
            amount : item[i].amount,
            productId : item[i].productId,
            userId : item[i].userId,
            timestamp : item[i].timestamp,
            email : item[i].email,
            status : "pending" },
            )
        array[i] = Newitem
    }
            return orderCollection.insertMany(array).then(()=>{
                return  CartItem.deleteMany({
                userId: id
          }) 
            })
                
            
        })}
    ).then(()=>{
        mongoose.disconnect()
        resolve()
    }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.cancle =(id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return orderCollection.deleteOne({
                _id:id
            }).then((item)=>{
                mongoose.disconnect()
                resolve()
            }).catch(err=>{
                    mongoose.disconnect()
                    reject(err)
                })
            })
    }
    )}
        