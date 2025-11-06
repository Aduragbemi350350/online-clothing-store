import express from 'express'
const router = express.Router()

import Order from '../models/Order.js'
import Product from '../models/Product.js'

router.get('/', async (req, res) => {
    try {
        const order = await Order.find()

        console.log(order)
        res.json(order)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


router.post('/', async (req, res) => {

    const order = {
        user: req.body.user,
        products: [{
            id: req.body.products[0].id,
            quantity: req.body.products[0].quantity,
            price: req.body.products[0].price
        }],
        status: req.body.status,
        totalCost: req.body.totalCost
    }
    try {
        //user's order
        let userOrder = await Order.findOne({ user: order.user })

        //update user order
        if (userOrder) {
            userOrder = await Order.updateOne({ _id: userOrder._id }, {
                $addToSet: {
                    products: {
                        $each: [
                            order.products[0]
                        ]
                    }
                }
            })
        }

        //create new order and add product
        if (!userOrder) {
            userOrder = await Order.create(order)
        }

        console.log(userOrder)
        res.json(userOrder)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


router.delete('/:id/:product', async (req, res) => {

    try {
        const cart = await Order.updateOne({ _id: req.params.id }, {
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