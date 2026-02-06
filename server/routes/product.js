import express from 'express'
const router = express.Router()


//LOCAL IMPORT
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.js'
import { multerUpload } from '../multer/multer.js'
import { authMiddleWare, getUser } from '../auth/authMiddleware.js'



router
    .get('/',getUser, getProducts)

    .post('/', authMiddleWare ,multerUpload.array("images"), createProduct)

    .get('/:slug', getProduct)

    .put('/:slug', updateProduct)

    .delete('/:slug', deleteProduct)


export default router