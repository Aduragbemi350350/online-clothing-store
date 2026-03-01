import Product from "../models/Product.js"
import errorHandler from "../utilities/errorHandler.js"
import fileRenamer from "../utilities/fileRenamer.js"
import { cloudinaryDeleteImage, cloudinaryDeleteImages, cloudinaryUpdateImage, cloudinaryUploadImages } from '../cloudinary/cloudinary.js'
import fs from 'fs'
import fileDeleter from "../utilities/fileDeleter.js"
import slugify from 'slugify'

//fetch all products
export const getProducts = async (req, res) => {
    try {
        //get query params 
        const queryBody = req.query

        //create a query object
        const params = {
            query: queryBody.query || null,
            category: queryBody.category || null,
            minPrice: Number(queryBody.minPrice) || null,
            maxPrice: Number(queryBody.maxPrice) || null
        }

        const { query, category, minPrice, maxPrice } = params


        //get all products
        const products = await Product.find()
        // console.log({ mess: "products", products })

        if(!products){
            //show result
            console.log({
                mess: "Products wasn't found"
            })
            return res.status(400).json({
                mess: "Products not found"
            })
        }

        let filteredProducts = []
        if (req.query) {
            //build smart search

            //filtered products
            filteredProducts = (products.filter((product) => {
                const { name, description } = product

                //check the product name and description for the query
                const isQuery = query === null ? true : (Object.values({ name, description }).some((item) => item.toLowerCase().includes(query.toLowerCase())))
                console.log({ mess: "isQuery", isQuery })

                //check the category
                const isCategory = category === null ? true : (product.category === category)
                console.log({ mess: "isCategory", isCategory })

                //check the price
                const isPrice = ((minPrice === null) || (minPrice <= product.price)) && ((maxPrice === null) || (maxPrice >= product.price))
                console.log({ mess: "isPrice", isPrice })

                return isQuery && isCategory && isPrice
            }))


            console.log({
                mess: "Filtered products",
                filteredProducts
            })
        }


        res.status(200).json(filteredProducts)
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
        const files = req.files
        const { name, description, category } = req.body
        const price = Number(req.body.price)
        //prevent duplicate
        const existingProduct = await Product.findOne({ ...req.body, price })
        if (existingProduct) {
            //delete sent images
            const deletionResponse = files.map((file) => fileDeleter(file.path))

            //show result
            console.log({
                mess: "This product already exist in the DB",
                deletionResponse
            })
            return res.status(409).json({
                mess: "This product already exist in the DB"
            })
        }


        //validate arguments
        if (!files.length > 0 || !description || !name || !price || !category || !user) {
            console.log({ "Create product": "Product images or product details aren't available" })
            res.status(400).json({ "Create product": "Product images or product details aren't available" })
            return
        }
        console.log({
            mess: "File object",
            files
        })


        //upload to cloudinary
        const images = await cloudinaryUploadImages(files)
        if (!(images.length > 0)) {
            console.log({
                mess: "Images wasn't uploaded to cloudinary",
                images
            })
            return res.status(400).json({ mess: "Images wasn't uploaded to cloudinary" })
        }
        //get only necessary image properties from cloudinary
        const newImages = images.map((image) => {
            return {
                publicId: image.public_id,
                secureURL: image.secure_url,
                resourceType: image.resource_type,
                folder: image.asset_folder,
                originalFilename: image.original_filename
            }
        })
        console.log({
            mess: "Extracting necessary properties from images coming from cloudinary",
            newImages
        })

        //delete file (image) from server once upload to cloudinary becomes succesful
        const deletedImages = files.map((file) => fileDeleter(file.path))
        console.log({
            mess: "Delete files after saving to cloudinary",
            deletedImages
        })

        //create a product
        const product = {
            name,
            price,
            description,
            category,
            images: newImages,
            slug: slugify(name),
            createdBy: user._id
        }
        console.log({
            mess: "Product",
            product
        })

        //create product in DB
        const createdProduct = await Product.create(product)

        if (!createdProduct) {
            console.log({
                mess: "product wasn't created",
                createdProduct
            })
            res.status(400).json({
                mess: "product wasn't created",
                createdProduct
            })
            return
        }

        //show outputs
        console.log({
            mess: "Product was created",
            createdProduct
        })
        res.status(200).json({ createdProduct })
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Create product error",
            errMess: error
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
        //get update from user
        const productId = req.params.id
        const productUpdate = req.body
        const files = req.files
        const user = req.user

        //show update details
        console.log({
            mess: "Update products",
            body: productUpdate,
            files,
            user
        })

        // confirm if there's update from the user
        if ((!productUpdate && !files) || !user) {
            console.log({
                mess: "Make sure all inputs are provided and you're loggedin!"
            })
            res.status(400).json({ mess: "Make sure all inputs are provided and you're loggedin!" })
        }

        //get product
        const product = await product.findById(productId)

        //check product
        if (!product) {
            //show result
            console.log({
                mess: "product wasn't found!",
            })
            return res.status(404).json({
                mess: "product wasn't found!",
            })
        }

        //check the product creator: product.user
        if (!(String(product.user) === String(user._id)) && !(String(user?.role) === "admin")) {
            //show result
            console.log({
                mess: "product can only be delete by its owner!",
            })
            return res.status(404).json({
                mess: "product can only be delete by its owner!",
            })
        }

        // confirm if image was updated
        let updatedImages
        if (files) {
            //confirm if product itself has images
            if (product.images) {
                //delete previous images in cloudinary
                const images = product.images
                const deletedImages = await cloudinaryDeleteImages(images)
                console.log({
                    mess: "Delete old images in cloudinary",
                    deletedImages
                })
            }

            //create new image in cloudinary: Update
            updatedImages = await cloudinaryUploadImages(files)
            console.log({
                mess: "Uploading updated images to cloudinary",
                updatedImages
            })
        }

        //get only necessary image properties from cloudinary
        const newImages = updatedImages.map((image) => {
            return {
                publicId: image.public_id,
                secureURL: image.secure_url,
                resourceType: image.resource_type,
                folder: image.asset_folder,
                originalFilename: image.original_filename
            }
        })
        console.log({
            mess: "Images with necessary properties",
            newImages
        })

        //check if images with the necessary properties are available
        if (!newImages) {
            return res.status(500).json({
                mess: "An error occured while getting updated images",
            })
        }

        //updated product
        const updateProduct = {
            name: productUpdate?.name || product.name,
            description: productUpdate?.description || product.description,
            price: productUpdate?.price || product.price,
            slug: slugify(productUpdate?.name, { lower: true }) || product.slug,
            category: productUpdate?.category || product.category,
            images: newImages.length > 0 ? newImages : product.images
        }
        console.log({
            mess: "Updated product details",
            updateProduct
        })

        //check if the product update details are available
        if (!updateProduct) {
            console.log({
                mess: "Product wasn't updated!"
            })
            res.status(500).json({
                mess: "Product wasn't updated!"
            })
            return
        }

        //update product in the DB
        const updatedProduct = await Product.findByIdAndUpdate(product._id, updateProduct, { new: true })

        //check if update was successful
        if (!updatedProduct) {
            console.log({
                mess: "Product wasn't updated in the DB successfully!"
            })
            res.status(500).json({
                mess: "Product wasn't updated in the DB successfully!"
            })
            return
        }

        //show final update result
        console.log({
            mess: "Product was updated in the DB successfully!",
            updatedProduct
        })
        return res.status(200).json(updatedProduct)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Update product error",
            error
        })
        res.status(err.status).json(err)
    }
}

//delete product
export const deleteProduct = async (req, res) => {
    try {

        const user = req.user
        const productId = req.params.id

        //verify user
        if (!user) {
            console.log({
                mess: "This isn't a verified user",
            })
            return res.status(400).json({ mess: "This isn't a verified user" })
        }

        //get product
        const product = await product.findById(productId)

        //check product
        if (!product) {
            //show result
            console.log({
                mess: "product wasn't found!",
            })
            return res.status(404).json({
                mess: "product wasn't found!",
            })
        }

        //check the product creator: product.user
        if (!(String(product.user) === String(user._id)) && !(String(user?.role) === "admin")) {
            //show result
            console.log({
                mess: "product can only be delete by its owner!",
            })
            return res.status(404).json({
                mess: "product can only be delete by its owner!",
            })
        }

        //check for product images
        if (product.images) {
            //delete images in cloudinary
            const deletionResponse = await cloudinaryDeleteImages(product.images)
            console.log({
                mess: "Images were deleted from cloudinary",
                deletionResponse
            })
        }

        //delete product from DB
        const deletionResponse = await Product.findByIdAndDelete(req.params.id)

        //check if product is deleted
        if (!deletionResponse) {
            console.log({
                mess: "Product wasn't deleted!"
            })
            res.status(500).json({
                mess: "Product wasn't deleted!"
            })
        }

        //show result
        console.log({
            mess: "Product deleted",
            deletionResponse
        })
        return res.status(200).json(deletionResponse)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete product error",
            error
        })
        res.status(err.status).json(err)
    }
}

//delete product
export const deleteProducts = async (req, res) => {
    try {
        //verify user
        const user = req.user
        if (!user || !(String(user?.role) === "admin")) {
            console.log({
                mess: "Products can only be deleted by admin",
            })
            return res.status(400).json({ mess: "Products can only be deleted by admin" })
        }

        //delete product from DB
        const deletionResponse = await Product.deleteAll()

        //check if product is deleted
        if (!deletionResponse) {
            console.log({
                mess: "Product wasn't deleted!"
            })
            res.status(500).json({
                mess: "Product wasn't deleted!"
            })
        }

        //show result
        console.log({
            mess: "Product deleted",
            deletionResponse
        })
        return res.status(200).json(deletionResponse)
    } catch (error) {
        const err = errorHandler(error)
        console.log({
            mess: "Delete product error",
            error
        })
        res.status(err.status).json(err)
    }
}
