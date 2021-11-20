const nodemailer = require("nodemailer");

const sendEmail = async mailOptions  =>{
    let transporters =nodemailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        auth : {
            user : process.env.SMPT_USER,
            pass : process.env.SMPT_PASS
        }
    })
    let info = await transporters.sendMail(mailOptions);
    console.log(`Message Send : ${info.messageId}`);
};

module.exports = sendEmail;