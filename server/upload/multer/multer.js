import multer from "multer";
import path from "path"
import fileRenamer from "../../utilities/fileRenamer.js";

const storage = multer.diskStorage({
    destination(req, file, cb){
        if(file.mimetype.startsWith("image/")){
            cb(null, "./public/images")
        }else if(file.mimetype.startsWith("audio/")){
            cb(null, "./public/audios")
        }else if(file.mimetype.startsWith("video/")){
            cb(null, "./public/videos")
        }else{
            cb(new Error("Multer Storage Error: Unsupported file!"))
        }
    },

    filename(req, file, cb){
        const name = fileRenamer(file.originalname)
        cb(null, name)
    }
})


export const multerUpload = multer({storage})