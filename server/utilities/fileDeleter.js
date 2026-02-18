 import fs from 'fs'

export default function fileDeleter(path){

    fs.unlink(path, (err)=>{
        if(err) return {mess: "File wasn't created"}
    })
    return {mess: "File deleted"}
}