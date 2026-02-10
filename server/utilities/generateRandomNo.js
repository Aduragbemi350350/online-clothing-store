

const generateRandomNo = (digitCount) => {
    let randomNo = ""

    for (let i = 0; i < digitCount; i++) {
        const number = (Math.floor(Math.random() * 10)).toString()
        randomNo += number
    }

    return randomNo
}

export default generateRandomNo