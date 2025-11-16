import express from 'express'
const router = express.Router()

//local import
import Product from '../models/Product.js'
import Review from '../models/Review.js'
import slugify from 'slugify'

//product seeder
router.post('/products', async (req, res) => {
  try {
    //delete all the content in the Product
    await Product.deleteMany()

    //products
    const body = req.body
    let products = []

    body.map((product) => {
      let updatedProduct = { slug: slugify(product.name, { lower: true }), ...product }
      products.push(updatedProduct)
    })

    const newProducts = await Product.create(products)
    console.log(newProducts)
    res.json(newProducts)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})


//review seeder
router.post('/reviews', async (req, res) => {
  try {
    //delete all the content in the Review
    await Review.deleteMany()

    const reviews = await Product.find()
    console.log(reviews)
    res.json(reviews)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})


export default router