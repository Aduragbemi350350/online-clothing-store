import Product from "../models/Product.js"
import errorHandler from "../utilities/errorHandler.js"
import fileRenamer from "../utilities/fileRenamer.js"
import { cloudinaryUpload } from '../cloudinary/cloudinary.js'

//fetch all products
export const getProducts = async (req, res) => {
    try {
        //get all products
        const products = await Product.find()
        let user = null
        if (req.user) {
            user = req.user
        }

        console.log({ availableProducts: products, currentUser: user })
        res.json(products)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Get products error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//create product
export const createProduct = async (req, res) => {
    try {
        const user = req.user
        const file = req.file

        const { name, price, description, category } = req.body

        //validate arguments
        if (!file || !description || !name || !price || !category || !user) {
            console.log({ "Create product": "Product images or product details aren't available" })
            res.status(400).json({ "Create product": "Product images or product details aren't available" })
            return
        }
        console.log({
            mess: "File object",
            file
        })


        //upload to cloudinary
        const response = cloudinaryUpload(file.path, "image", res)

        //get image properties from cloudinary response
        const imageProp = {
            publicKey: response.public_key,
            secureURL: response.secure_url,
            resoureType: response.resoure_type,
            folder: response.asset_folder,
            originalFilename: response.original_filename
        }
        console.log({
            mess: "save image to cloudinary",
            imageProp
        })


        //create a product
        const product = {
            name,
            price,
            description,
            category,
            image: imageProp,
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
        const err = errorHandler(error)
        console.log({
            mess: "Create product error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//fetch a product
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })

        const error = {
            name: "Document Not Found Error!",
            message: "Page Not Found!",
            status: 400
        }
        if (!product) return res.status(400).json(error)
        console.log(product)
        res.status(200).json(product)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Get product error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//update product
export const updateProduct = async (req, res) => {
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
        const err = errorHandler(error)
        console.log({
            mess: "Update product error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}

//delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
        const productId = product._id

        const deletedProduct = await Product.findByIdAndDelete(productId)
        // delete product review
        const productReviews = await Review.deleteMany({ product: productId })

        console.log(deletedProduct)
        return res.json(deletedProduct)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete product error",
            errMess: err
        })
        res.status(err.status).json(err)
    }
}
