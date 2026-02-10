
const generateExpiryTime = (time) => {
    return Date.now() * time * 60 * 1000
}


export default generateExpiryTime