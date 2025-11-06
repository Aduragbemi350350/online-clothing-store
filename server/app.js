//PACKAGE IMPORT
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import slugify from 'slugify';
import mongodb from 'mongodb'
import mongoose from 'mongoose'

//MIDDLEWARE SETUP
const app = express();
app.use(cors());
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.MONGODB)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((err)=>{
    console.log("MongoDB not connected: ", err)
})


//ROUTES
//root
app.get('/', (req, res)=>{
    res.json('welcome to homepage')
})
//users
import users from './routes/user.js'
app.use("/api/users", users)
//products
import products from './routes/product.js'
app.use("/api/products", products)
//reviews
import reviews from './routes/review.js'
app.use("/api/reviews", reviews)
//cart
import cart from './routes/cart.js'
app.use("/api/cart", cart)
//order
import order from './routes/order.js'
app.use("/api/order", order)



const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("Listening on port:", port)
})