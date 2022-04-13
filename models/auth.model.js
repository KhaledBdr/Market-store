const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const DB_URL =  "mongodb://localhost:27017/online-shop"


const usersch = mongoose.Schema({
    username: String,
    email : String,
    password : String,
    isAdmin : {
        type: Boolean,
        default : false
    }
})

const User = mongoose.model('user' , usersch)

exports.createNewUser = (name , email , password)=>{

   return new Promise((resolve, reject)=>{
    mongoose.connect(DB_URL).then(()=>{

          return User.findOne({
              email:email
          })}).then(user =>{
              if(user) {
              mongoose.disconnect() 
              reject("Email is Used")
              }else{

               return  bcrypt.hash(password , 10)
            }}).then(hashedPassword =>{
               let user = new User({
                    username : name,
                    email : email,
                    password : hashedPassword
            })
               return user.save()
        }).then((user) =>{
                mongoose.disconnect()
                resolve(user)
            }).catch(err=>{ 
                
                mongoose.disconnect()
                reject(err) 
            })
           })
              }

      exports.login = (email , password)=>{


          return new Promise((resolve,reject)=>{
              mongoose.connect(DB_URL).then(()=>
                        User.findOne( 
                            {email:email})).then(user=>{
                      if(!user){
                        mongoose.disconnect()
                         reject(`There is no user matches The Email ${email}, Don't Waste your time and Create an Account 
                            All of us need You`)
                      }else{

                         bcrypt.compare(password , user.password).then(same =>{
                            if(!same){
                                mongoose.disconnect()
                                reject(` Password is incorrect for Email  ${email} , Plz Enter Correct Password`)
                            }else{
                                mongoose.disconnect()
                                
                                resolve({
                                    id : user._id,
                                    isAdmin : user.isAdmin
                                })
                            }
                        })
                     }

                    }).catch(err =>{
              mongoose.disconnect()
              reject(err)})
          })//
      }//