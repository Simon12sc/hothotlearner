import nodemailer from "nodemailer";

const sendMail = async ({email,subject,message})=>{
    console.log(message)
    const transporter= nodemailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:email,
        subject,
        text:message
    }
    
    await transporter.sendMail(mailOptions)

}

export default sendMail;