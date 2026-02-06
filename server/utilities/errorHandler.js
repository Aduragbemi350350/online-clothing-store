const errorHandler = (error) => {
    //castError
    if (error.name === "CastError") {
        return {
            name: "CastError",
            message: `Invalid ${error.path}`,
            status: 400,
            value: error.value
        }
    }

    if (error.name === "ValidationError") {
        return {
            name: "ValidationError",
            message: "Validation failed",
            status: 400,
        }
    }

    if (error?.code === 11000) {
        const keyValue = error.keyValue
        let value
        for(const key in keyValue){
            value = keyValue[key]
        }
        return {
            name: "MongoServerError",
            message: `${value} already exist!`,
            status: 409
        }
    }

    return {
        name: "Unknown",
        message: "An unexpected error occurred!",
        status: 500
    }
}


export default errorHandler