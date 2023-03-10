const nodemailer = require("nodemailer");

const {AUTH_EMAIL , AUTH_PASS} = process.env;

let transporter = nodemailer.createTransport({
    // service: 'gmail',
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // use SSL
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    // tls: {
    //    ciphers:'SSLv3'
    // },
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

//test transporter
transporter.verify((error, success)=>{
if(error){
    console.log(error);
} else {
    console.log("ready for message");
    console.log(success);
}

});

// send email
const sendEmail = async (mailOptions) =>{
    try {
        await transporter.sendMail(mailOptions);
        return;
    } catch (error) {
        throw error;
    }
};

module.exports=sendEmail;
