import path from "path"

export default function fileRenamer(originalName){
    const extname = path.extname(originalName)
    const basename = path.basename(originalName, extname)
    const filteredBasename = basename.replace(/\s+/g, "").replace(/[^a-zA-Z0-9-_]/,"-")

    const name = `${filteredBasename}-${Date.now()}${extname}`
    return name
}