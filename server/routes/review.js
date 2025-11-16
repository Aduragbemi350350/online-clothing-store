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
        comments: req.body?.comments,
        reaction: req.body?.reaction
    }

    const { product, user, rating, comments, reaction } = review
    try {
        //check if the user has made a review to that product
        const existingReview = await Review.findOne({
            product: product,
            user: user
        })

        //update review if user had made a review to that product
        if (existingReview) {
            let updatedReview
            if (rating) {
                updatedReview = await Review.updateOne({ _id: existingReview._id }, {
                    $set: { rating: rating }
                })
            }

            if (comments) {
                updatedReview = await Review.updateOne({ _id: existingReview._id }, {
                    $addToSet: {
                        comments: {
                            $each: [comments]
                        }
                    }
                })
            }

            if (reaction) {
                updatedReview = await Review.updateOne({ _id: existingReview._id }, {
                    $set: { reaction: reaction }
                })
            }

            console.log("Review is updated:", updatedReview)
            res.json(updatedReview)
        }


        //user hasn't written anything review about the product
        let createReview
        if (!existingReview) {
            createReview = await Review.create(review)

            console.log("Review is created:", createReview)
            res.json(createReview)
        }


        //update product review
        if (createReview) {
            const productReview = await Product.updateOne({ _id: review.product }, {
                $addToSet: {
                    reviews: {
                        $each: [
                            createReview?._id
                        ]
                    }
                }
            })


            console.log("Product Review:", productReview)
            console.log("Review:", createReview)

            //we need to return the product
            // res.json(createReview)
            res.json(productReview)
        }
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


router.delete('/:id', async (req, res) => {

    try {
        //find review by id and delete
        const deleteReview = await Review.findByIdAndDelete(req.params.id)

        console.log(deleteReview)
        res.json(deleteReview)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})


export default router