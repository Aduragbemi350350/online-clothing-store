import cloudinary from "cloudinary"
import errorHandler from "../utilities/errorHandler.js"


//upload image
const cloudinaryuploadImage = async (filePath) => {
    try {
        //save file in cloudinary
        const image = await cloudinary.v2.uploader.upload(filePath, {
            folder: `online-clothing-store/images`,
            resource_type: "image"
        })

        //show response
        console.log({
            mess: "Uploaded image to cloudinary",
            image
        })
        return image
    } catch (error) {
        console.log({
            mess: "Uploading image to cloudinary failed",
            error
        })
        throw new Error("An error occured while uploading image to cloudinary")
    }
}

//upload images
const cloudinaryUploadImages = async (files) => {
    try {

        const uploads = files.map((file) => {
            return cloudinary.v2.uploader.upload(file.path, {
                folder: 'online-clothing-store/images',
                resource_type: 'image'
            })
        })

        const images = await Promise.all(uploads)

        //show response
        console.log({
            mess: "Uploaded images to cloudinary",
            images
        })
        return images
    } catch (error) {
        console.log({
            mess: "Uploading images to cloudinary failed",
            error
        })
        throw new Error("An error occured while uploading image to cloudinary")
    }
}

//fetch image
const cloudinaryFetchImage = async (publicId) => {
    try {
        const image = await cloudinary.v2.api.resource(publicId, {
            resource_type: "image"
        })

        //show image
        console.log({
            mess: "Fetch inage from cloudinary",
            image
        })
        return image
    } catch (error) {
        console.log({
            mess: "Fetching image from cloudinary failed",
            error
        })
        throw new Error("An error occured while fetching image")
    }
}

//fetch images
const cloudinaryFetchImages = async () => {
    try {
        const images = await cloudinary.v2.api.resources({
            type: "upload",
            prefix: "online-clothing-store/images",
            resource_type: "image"
        })

        //show images
        console.log({
            mess: "Fetched inages from cloudinary",
            images
        })
        return images
    } catch (error) {
        console.log({
            mess: "Fetch images from cloudinary failed",
            error
        })
        throw new Error("An error occured while fetching all images")
    }
}

//update image
const cloudinaryUpdateImage = async (newImagePath, oldImagePublicId) => {
    try {
        const updatedImage = await cloudinary.v2.uploader.upload(newImagePath, {
            public_id: oldImagePublicId,
            overwrite: true,
            resource_type: "image"
        })

        //show images
        console.log({
            mess: "Updated image in cloudinary",
            updatedImage
        })
        return updatedImage
    } catch (error) {
        console.log({
            mess: "Updating image in cloudinary failed",
            error
        })
        throw new Error("An error occured while updating image")
    }
}

//delete image
const cloudinaryDeleteImage = async (publicId) => {
    try {
        const response = await cloudinary.v2.uploader.destroy(publicId, {
            resource_type: 'image'
        })

        //show images
        console.log({
            mess: "Deleted image in cloudinary",
            response
        })
        return response
    } catch (error) {
        console.log({
            mess: `Deleting image -${publicId} from cloudinary failed`,
            error
        })
        throw new Error("An error occured while deleting image")
    }
}

//delete images
const cloudinaryDeleteImages = async (images) => {
    try {
        const response = images.map((image) => {
            return cloudinary.v2.uploader.destroy(image.publicId, {
                resource_type: 'image'
            })
        })
        const deletedImagesResponse = Promise.all(response)

        //show images
        console.log({
            mess: "Deleted images in cloudinary",
            deletedImagesResponse
        })

        return deletedImagesResponse
    } catch (error) {
        console.log({
            mess: "Deleting images from cloudinary failed",
            error
        })
        throw new Error("An error occured while deleting images")
    }
}

export {
    cloudinaryuploadImage,
    cloudinaryUploadImages,
    cloudinaryFetchImage,
    cloudinaryFetchImages,
    cloudinaryUpdateImage,
    cloudinaryDeleteImage,
    cloudinaryDeleteImages
}