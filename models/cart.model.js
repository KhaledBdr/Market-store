const mongoose = require('mongoose')

const DB_URL =  "mongodb://localhost:27017/online-shop"
const schema = mongoose.Schema({
    name : String,
    price : Number,
    amount : Number,
    productId : String,
    userId : String,
    timestamp : Number,
    email: String
})


const  CartItem = mongoose.model("cart" , schema)

// connect
// search
// if(found){
    // update   amount = amount + data.amount
//}
// else{
    //insert
// }

    function findItem(id){
        mongoose.connect(DB_URL).then(()=>{
            if(CartItem.exists({productId: id})){
                mongoose.disconnect()    
                return true
            }else{
                mongoose.disconnect()
                return false
            }
        })
    }


exports.addNewItem = (id , data)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return CartItem.findOne({
                productId:id
            })}).then(item =>{
                if(item) {
                    newAmount = (+item.amount) + (+data.amount)  
                return CartItem.updateOne({ productId : id},{
                        amount : newAmount
                    }).then(()=>{
                mongoose.disconnect() 
                })}else{
                    
            let item = new  CartItem(data)
            return item.save()
            }
        }).then(()=>{
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
           return  CartItem.find({  userId : userId   } , {} ,{sort :{ timestamp : 1}} )
        }).then(items=>{
                mongoose.disconnect()
                resolve(items)
            }).catch(err=>{
                mongoose.disconnect()
                 reject(err)
                })
        })
}

getItemsFromDB = (userId)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
           return  CartItem.find({  userId : userId   } , {} ,{sort :{ timestamp : 1}} )
        }).then(items=>{
                mongoose.disconnect()
                resolve(items)
            }).catch(err=>{
                mongoose.disconnect()
                 reject(err)
                })
        })
}

exports.editItem = (id , newData)=>{
   
        
    return new Promise((resolve , reject)=>{
    mongoose.connect(DB_URL).then(()=>
        CartItem.updateOne({_id: id} , newData)
).then (items =>{
        mongoose.disconnect()
        resolve(items)
    }).catch(err =>{
        mongoose.disconnect()
        reject(err)
      })
    })
   }


   exports.deleteItem = (userId , id)=>{
       return new Promise((resolve,reject)=>{
           mongoose.connect(DB_URL).then(()=>
           CartItem.deleteOne({_id : id , userId : userId} , console.log("deleted"))
           ).then(item =>{
               mongoose.disconnect()
               resolve(item)
           }).catch(err =>{
               mongoose.disconnect()
                reject(err)
            })
       })
   }







exports.deleteAll = (userId)=>{
    return new Promise((resolve , reject)=>{


        mongoose.connect(DB_URL).then(()=>
            CartItem.deleteMany({userId : userId})
         ).then(()=>{
            mongoose.disconnect()
                resolve()
        }).catch(err => reject(err))


    })
}