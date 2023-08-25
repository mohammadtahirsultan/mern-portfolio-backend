import nodemailer from 'nodemailer'

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMPTP_SERVER,
        service: process.env.SMTP_SERIVCE,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    // send mail with defined transport object
    const info = {
        from: process.env.SMTP_USERNAME, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    };

    await transporter.sendMail(info)
}



export default sendEmail;