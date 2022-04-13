const bodyParser = require('body-parser').urlencoded({extended:true})
const express = require('express')
const app = express()

const flash = require('connect-flash')
const session = require("express-session")
const sessionStore = require('connect-mongodb-session')(session)





const path = require('path')
const homeRouter = require("./routes/home.route")
const productRouter = require("./routes/product.route")
const authRouter = require("./routes/auth.route")
const cartRouter = require("./routes/cart.route")
const ordersRouter = require("./routes/orders.route")
const adminRouter = require("./routes/admin.route")



app.use(express.static(path.join(__dirname , 'assets')))
app.use(express.static(path.join(__dirname , 'images')))
app.use(flash());

const store = new sessionStore({
    uri: "mongodb://localhost:27017/online-shop",
    collection : 'session'
})
app.use(session({
    secret : "Hello my name is khaled  and it's the way to secret secret my data",
    store :store,
    saveUninitialized: false
    
}))

app.set('view engine' , 'ejs')
app.set('views' ,'views')

app.use('/' , homeRouter)
app.use('/' ,authRouter)
app.use('/product' ,productRouter)
app.use('/cart' , cartRouter)
app.use('/orders' , ordersRouter)
app.use('/admin' , adminRouter)
app.get("/not-admin" , (req, res , next) => {
    res.status(403)
    res.render("not-admin" , {
        isUser : req.session.userId,
        isAdmin:false,
        title: "Adminstration"
    })
})

// app.use((errors , req, res, next){
//     res.redirect("not-admin")
// })

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log("Server is running on port " + port)
})