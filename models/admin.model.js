const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/online-shop"
const manageModel = mongoose.model("order")
const manageProduct = mongoose.model("product")
exports.getOrders = ()=>{
     return new Promise((resolve , reject)=>{
         
 mongoose.connect(DB_URL).then(()=>{
         return manageModel.find({}).then(items=>{
             mongoose.disconnect()
             resolve(items)
         })
     }).catch(err=>{
         mongoose.disconnect()
         reject(err)
     })
 })
}

exports.getOrdersByEmail =(Email)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return manageModel.find({email:Email} ).then((items)=>{
                mongoose.disconnect()
                resolve(items)
            })
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getOrdersByStatus = (Status)=>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
        return manageModel.find({status : Status}).then((items)=>{
            mongoose.disconnect()
            resolve(items)
        })
    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })
})
}
exports.postStatus = (id , newStatus)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return manageModel.updateOne({
                _id : id
            } , {
                status : newStatus
            }).then((item)=>{
                mongoose.disconnect()
                resolve(item)
            })
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

