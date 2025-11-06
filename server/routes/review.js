import express from 'express'
const router = express.Router()

//LOCAL IMPORT
import Review from '../models/Review.js'
import Product from '../models/Product.js'

router.get('/', async (req, res) => {

    try {
        const reviews = await Review.find()

        console.log(reviews)
        res.json(reviews)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.post('/', async (req, res) => {
    const review = {
        product: req.body.product,
        user: req.body.user,
        rating: req.body?.rating,
        comment: req.body?.comment,
        reaction: req.body?.reaction
    }
    try {
        const createReview = await Review.create(review)

        //update product review
        const productReview = await Product.updateOne({ _id: review.product }, {
            $addToSet: {
                reviews: createReview._id
            }
        })

        console.log("Product Review:", productReview)
        res.json(createReview)

    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

router.put('/:id', async (req, res) => {
    const { rating, comment, reaction } = req.body

    try {
        //This should be refractor because multiple update cannot be performed at a go!
        if (rating) {
            await Review.updateOne({
                "_id": req.params.id
            }, {
                $set: {
                    rating
                }
            })


        } else if (comment) {
            await Review.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    comment
                }
            })
        } else if (reaction) {
            await Review.updateOne({
                _id: req.params.id
            }, {
                $set: {
                    reaction
                }
            })
        }

        const updatedReview = await Review.findById(req.params.id)
        console.log(updatedReview)
        res.json(updatedReview)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})





export default router