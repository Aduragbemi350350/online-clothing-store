import cloudinary from "cloudinary"
import errorHandler from "../utilities/errorHandler.js"


//upload file
const cloudinaryUpload = async (filePath, fileType, res) => {
    try {
        let resourceType = fileType

        //modify audio type
        if (filePath === "audio") resourceType = "video"

        //save file in cloudinary
        const response = await cloudinary.v2.uploader.upload(filePath, {
            folder: `online-clothing-store/${fileType}s`,
            resource_type: resourceType
        })

        //show response
        console.log({
            mess: "Upload file to cloudinary",
            response
        })

        return response
    } catch (error) {
        const cloudinaryError = errorHandler(error)
        console.log({
            mess: "Upload file to cloudinary failed",
            cloudinaryError
        })
        res.status(cloudinaryError.status).json(cloudinaryError)
    }
}

//read file
const fetchImages = async () => {
    try {
        const response = await cloudinary.v2.api.resources({
            type: "upload",
            prefix: "online-clothing-store/images",
            resource_type: "image"
        })

        //show response
        console.log({
            mess: "Fetch inages from cloudinary",
            response
        })

        return response
    } catch (error) {
        const cloudinaryError = errorHandler(error)
        console.log({
            mess: "Fetch images from cloudinary failed",
            cloudinaryError
        })
        res.status(cloudinaryError.status).json(cloudinaryError)
    }
}

const fetchImage = async (publicId) => {
    try {
        const response = await cloudinary.v2.api.resource(publicId, {
            resource_type: "image"
        })

        //show response
        console.log({
            mess: "Fetch inage from cloudinary",
            response
        })

        return response
    } catch (error) {
        const cloudinaryError = errorHandler(error)
        console.log({
            mess: "Fetch image from cloudinary failed",
            cloudinaryError
        })
        res.status(cloudinaryError.status).json(cloudinaryError)
    }
}

export {
    cloudinaryUpload,
    fetchImages,
    fetchImage
}