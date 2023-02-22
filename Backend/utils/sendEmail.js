const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
    console.log("pass1")
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        service: process.env.SMPT_MAIL,
        auth:{
            user: "fahadkidwai2704@gmail.com",
            pass: "@27May2001@",
        },
    });

    const mailOptions ={
        
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(info.response)
    });

};

module.exports = sendEmail;