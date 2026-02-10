import generateRandomNo from "../utilities/generateRandomNo.js";
import nodemailer from "nodemailer"
import dns from 'dns'
dns.setDefaultResultOrder('ipv4first')

//generate OTP
export const otpGenerator = {
    otp: generateRandomNo(6),
    otpExpiresAt: Date.now() * 20 * 60 * 1000
}

//generate mail
export const generateOTPMail = (user) => {
    const { username, email, otp } = user

    //mail
    const mail = {
        from: process.env.APP_EMAIL,
        to: email,
        subject: "Verify OTP",
        body: `
            <h2>${username}, Thanks for choosing the Online-Clothing-Store.</h2>
            <p>This is your OTP ${otp}</P>
        `
    }
    return mail
}

//send email to the user
export const sendUserOTP = async (mail) => {
    try {
        //create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            family: 4,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            }
        })


        //send mail to user
        const sentMail = await transporter.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            html: mail.body
        })

        return sentMail
    } catch (error) {
        console.log({
            mess: "Can't send mail",
            error
        })
    }
}
