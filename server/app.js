//PACKAGE IMPORT
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import slugify from 'slugify';
import { dbConnector } from './mongoDB/dbConnector.js';
import cookieParser from 'cookie-parser'

//MIDDLEWARE SETUP
const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://online-clothing-store-zay8.onrender.com"],
    credentials: true
}));
app.use(express.json())
dotenv.config()
app.use(express.static('public'))
dbConnector()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//ROUTES
//import routes
import users from './routes/user.js'
import products from './routes/product.js'
import reviews from './routes/review.js'
import cart from './routes/cart.js'
import order from './routes/order.js'
import seeder from './seeder/seeder.js'
import commentRouter from './routes/comment.js';

//configure routes
app.get('/', (req, res) => {
    res.json('welcome to homepage')
})
app.use("/api/users", users)
app.use("/api/products", products)
app.use("/api/reviews", reviews)
app.use("/api/cart", cart)
app.use("/api/order", order)
app.use("/api/seeder", seeder)
app.use('/api/comments', commentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Listening on port:", port)
})