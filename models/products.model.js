const mongoose = require('mongoose')


//
const DB_URL =  "mongodb://localhost:27017/online-shop"
const sch = mongoose.Schema({
    name: String,
    description : String,
    price : Number,
    category:String,
    image : String
})
const product = mongoose.model('product' , sch)
const productDelete = mongoose.model('product')
exports.getAllProducts = ()=>{

    // 1 - Connect to DB
    // 2 - Get All Products
    // 3 - Close DB
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return product.find({})
        }).then(product=>{

            mongoose.disconnect()
            resolve(product)
        }).catch(err =>  reject(err))
    })

} 


exports.getFirstProducts = ()=>{

    // 1 - Connect to DB
    // 2 - Get All Products
    // 3 - Close DB
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return product.findOne({})
        }).then(product=>{

            mongoose.disconnect()
            resolve(product)
        }).catch(err =>  reject(err))
    })

} 

exports.getProductsByCategory = (category)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return product.find({
                category :category
            })
        }).then(products=>{

            mongoose.disconnect()
            resolve(products)
        }).catch(err =>  reject(err))
    })
}

exports.getProductsById = (id)=>{
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(
            ()=>{
                return product.findById(id)
            }).then(product=>{
                mongoose.disconnect()
                resolve(product)
            }).catch(err=> reject(err))
    })
}
exports.addProduct  = (data)=>{
     
    return new Promise((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
                let newProduct =new product(data)

                return newProduct.save()
            }).then(()=>{
                mongoose.disconnect()
                resolve()
            }).catch(
                err=>{
                    mongoose.disconnect()
                    reject(err)
                }
            )
    })
}

exports.deleteProduct = (id)=>{
    return new Promise ((resolve , reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            console.log("connected")
            console.log(id)
        return productDelete.deleteOne({
            _id : id
        }).then((item)=> {
                mongoose.disconnect()
                console.log(item)
                resolve (item)
        })
    }).catch(err =>{
        reject(err)
    })
})
}