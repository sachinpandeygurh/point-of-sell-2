const nodeMailer = require("nodemailer");
const dotenv = require('dotenv');


// dotenv.config({ path: "backend/config/config.env" });

const host = process.env.SMPT_HOST ||'smtp.ethereal.email'
const port = process.env.SMPT_PORT || 587
const service = process.env.SMPT_SERVICE || 'ethereal';
const user = process.env.SMPT_MAIL ||'frederik.wyman1@ethereal.email'
const pass = process.env.SMPT_PASSWORD || 'CCPvUAz33qw9v2eCvr'
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host,
    port,
    service,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: user,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// console.log('HOST', host);
// console.log('PORT', port);
// console.log('SERVICE', service);
// console.log('MAIL', user);
// console.log('PASSWORD', pass);

module.exports = sendEmail;


// const nodeMailer = require("nodemailer")
// const dotenv =require('dotenv')

// dotenv.config();
// const sendEmail = async(options)=>{
//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMPT_HOST || smtp-relay.gmail.com,
//         port: process.env.SMPT_PORT ||  465 || 587,
//         service: process.env.SMPT_SERVICE || gmail,
//         auth:{
//             user: process.env.SMPT_MAIL || 'sachinmernstack@gmail.com',
//             pass: process.env.SMPT_PASSWORD  || 'Lallapandeysacgin@1203'
//         }
//     })
//     const mailOptions={
//         from: process.env.SMPT_MAIL || 'sachinmernstack@gmail.com',
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     }
//     await transporter.sendMail(mailOptions)

// }
// console.log('HOST' , host); // i want to check my host
// console.log('PORT' , port); // i want to check my port 
// console.log('SERVICE' , service); // i want to check my service 
// console.log('MAIL' , user); // i want to check my user 
// console.log('PASSWORD' , pass); // i want to check my pass 


// module.exports = sendEmail 

