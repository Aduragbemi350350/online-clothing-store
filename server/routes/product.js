import express from 'express'
const router = express.Router()


//LOCAL IMPORT
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.js'
import { multerUpload } from '../upload/multer/multer.js'
import { authMiddleWare, getUser } from '../auth/authMiddleware.js'



router
    .get('/',getUser, getProducts)

    .post('/', authMiddleWare, multerUpload.array("images"), createProduct)

    .get('/:slug', getProduct)

    .put('/:id', multerUpload.array("images"),updateProduct)

    .delete('/:id', authMiddleWare, deleteProduct)


export default router