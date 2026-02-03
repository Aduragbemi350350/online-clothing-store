import express from 'express'
const router = express.Router()


//LOCAL IMPORT
import Product from '../models/Product.js'
import Review from '../models/Review.js'
import slugify from 'slugify'
import { getProducts } from '../controllers/products.js'
import { multerUpload } from '../multer/multer.js'
import fileRenamer from '../utilities/fileRenamer.js'
import { authMiddleWare, getUser } from '../auth/authMiddleware.js'



router.get('/',getUser, getProducts)

router.post('/', authMiddleWare ,multerUpload.array("images"), async (req, res) => {
    try {
        const user = req.user
        const files = req.files
        const { name, price, description, category } = req.body

        if (!files || !description || !name || !price || !category || !user) {
            console.log({ "Create product": "Product images or product details aren't available" })
            res.status(400).json({ "Create product": "Product images or product details aren't available" })
            return
        }

        //get image name
        const imageName = files.map((file) => {
            const name = fileRenamer(file.originalname)
            return name
        })

        console.log(imageName)

        //create a product
        const product = {
            name,
            price,
            description,
            category,
            image: imageName[0],
            slug: slugify(name),
            createdBy: user._id
        }

        //create product in DB
        const createdProduct = await Product.create(product)

        if (!createdProduct) {
            console.log({ "Create product": "Product wasn't created in the DB" })
            res.status(400).json({ "Create product": "Product wasn't created in the DB" })
            return
        }
        
        console.log({ "This product is created": createdProduct })
        res.json({ "This product is created": createdProduct })
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
        const productReviews = await Review.deleteMany({ product: productId })

        console.log(deletedProduct)
        return res.json(deletedProduct)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})





export default router