import Product from "../models/Product.js"


export const getProducts = async(req, res)=>{
    try {
        //get all products
        const products = await Product.find()
        let user = null
        if(req.user){
            user = req.user
        }

        console.log({products, user})
        res.json(products)
    } catch (error) {
        console.log(error)
        return res.json(error)
    }
}
