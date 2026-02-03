import mongoose from "mongoose"

//connects with the DB
export async function dbConnector(){
    try {
        console.log("MongoDb connecting...")
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb connected successfully!")
    } catch (error) {
        console.log("MongoDB connnection unsuccessful:", Error(error))
    }
}

//export multiple functions in a module/file.

export default function getNum(){

}

