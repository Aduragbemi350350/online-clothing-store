import express from 'express'
const router = express.Router()


//LOCAL IMPORT
import Product from '../models/Product.js'
import Review from '../models/Review.js'
import slugify from 'slugify'

router.get('/', async (req, res) => {

    try {
        //get all products
        const products = await Product.find()

        console.log(products)
        res.json(products)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})

router.post('/', async (req, res) => {

    const body = req.body
    let products = []

    body.map((product)=>{
        let updatedProduct = { slug: slugify(product.name, {lower : true}), ...product}
        products.push(updatedProduct)
    })

    try {
        const newProduct = await Product.create(products)

        console.log(newProduct)
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})


router.get('/:slug', async (req, res) => {

    try {
        const product = await Product.findOne({ slug: req.params.slug })

        console.log(product)
        res.json(product)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
})


router.put('/:slug', async (req, res) => {

    try {
        const product = await Product.findOne({ slug: req.params.slug })
        const productId = product._id
        const updateProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            slug: slugify(req.body.name, { lower: true }),
            category: req.body.category,
            createdBy: req.body?.createdBy || product.createdBy
        }
        console.log(updateProduct)

        const updatedProduct = await Product.findByIdAndUpdate(productId, updateProduct, { new: true })

        console.log(updatedProduct)
        return res.json(updatedProduct)

    } catch (error) {
        console.log(error)
        res.json(error)
    }
})



router.delete('/:slug', async (req, res) => {


    try {
        const product = await Product.findOne({ slug: req.params.slug })
        const productId = product._id

        const deletedProduct = await Product.findByIdAndDelete(productId)
        // delete product review
        const productReviews = await Review.deleteMany({product: productId})

        console.log(deletedProduct)
        return res.json(deletedProduct)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})





export default router