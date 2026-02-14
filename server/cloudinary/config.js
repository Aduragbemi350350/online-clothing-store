import errorHandler from '../utilities/errorHandler.js'
import cloudinary from 'cloudinary'


const cloudinaryConfig = async () => {

    try {
        console.log("Cloudinary connnecting...")
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_KEY,
            api_secret: process.env.CLOUDINARY_SECRET
        })
        console.log("Cloudinary connnected!")
    } catch (error) {
        const cloudinaryError = errorHandler(error)
        console.log(cloudinaryError)
    }
}

export default cloudinaryConfig