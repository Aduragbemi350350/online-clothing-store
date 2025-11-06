import express from 'express'
const router = express.Router()

import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

router.get('/', async (req, res) => {
    try {
        const productsInCart = await Cart.find()

        console.log(productsInCart)
        res.json(productsInCart)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


router.post('/', async (req, res) => {

    const cart = {
        user: req.body.user,
        products: [{
            id: req.body.products[0].id,
            quantity: req.body.products[0].quantity,
            price: req.body.products[0].price
        }]
    }

    console.log(cart)
    try {

        //check if the user exist
        let usersCart = await Cart.findOne({ user: cart.user })

        if (usersCart) {

            //check if product already exist in cart
            let productExist = false
            let cardProductId //needed to get the existing product in the cart

            usersCart.products.forEach((product) => {
                if (product.id.toString() === cart.products[0].id.toString()) {
                    productExist = true
                    //cart product id
                    cardProductId = product._id  

                    console.log(productExist)
                    console.log(cardProductId)
                };
            })

            //if the product exist, update product
            if (productExist) {
                usersCart = await Cart.updateOne({ _id: usersCart._id, "products._id": cardProductId },
                    {
                        $set: {
                            "products.$.quantity": cart.products[0].quantity,
                            "products.$.price": cart.products[0].price
                        }
                    }
                )
            }

            //if product doesn't exist, add product
            if (!productExist) {
                usersCart = await Cart.updateOne(
                    { _id: usersCart._id },
                    {
                        $addToSet: {
                            products: {
                                $each:
                                    [
                                        {
                                            id: cart?.products[0].id,
                                            quantity: cart?.products[0].quantity,
                                            price: cart?.products[0].price
                                        }
                                    ]
                            }
                        }
                    }
                )
            }
        }

        //if user doesn't exist, create new cart
        if (!usersCart) {
            usersCart = await Cart.create(cart)
        }

        console.log(usersCart)
        res.json(usersCart)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


router.put('/:id/:product', async (req, res) => {

    try {
        const { quantity } = req.body

        if (quantity) {
            const cart = await Cart.updateOne({ _id: req.params.id, "products._id": req.params.product }, {
                $set: {
                    "products.$.quantity": quantity
                }
            })

            console.log(cart)
            res.json(cart)
        } else {
            console.log(`product- ${req.params.product} isn't updated`)
            res.json(`product- ${req.params.product} isn't updated`)
        }
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


router.delete('/:id/:product', async (req, res) => {
    //product id
    // const { productId } = req.body

    try {
        const cart = await Cart.updateOne({ _id: req.params.id }, {
            $pull: {
                products: {
                    _id: req.params.product
                }
            }
        })


        console.log(cart)
        res.json(cart)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


export default router