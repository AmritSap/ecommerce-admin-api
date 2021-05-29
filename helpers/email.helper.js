import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SMTP,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

// async..await is not allowed in global scope, must use a wrapper
const send = async (mailInfo) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // send mail with defined transport object
    let info = await transporter.sendMail(mailInfo);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.log(error);
  }
};

export const emailProcessor = ({ type, ...data }) => {
  const info = {
    from: `Amrit Store <${process.env.EMAIL_USER}>`, // sender address
    to: data.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  switch (type) {
    case "OTP_REQUEST":
      const info = {
        to: data.email, // list of receivers
        subject: "OTP for your passswrod request", // Subject line
        text: `Hi this is otpp for your password,${data.otp}, this token will expire shortly`, // plain text body
        html: `<div>     <p>Hello there</p>
    <p>Hi this is otpp for your password, this token will expire shortly</p>
    <p style="background:'red';color:'white';background: red;color: white;display: inline;padding: 10px;">${data.otp}</p>
     </div>`, // html body
      };
      send(info);
      break;
    case "UPDATE_PASS_SUCESS":
      info = {
        to: data.email, // list of receivers
        subject: "password update notification", // Subject line
        text: `Hi ur password is updated`, // plain text body
        html: `<div>     <p>Hello there</p>
    <p>Hi ur password is updated</p>
    <p style="background:'red';color:'white';background: red;color: white;display: inline;padding: 10px;">updated</p>
     </div>`,
      };
      send(info);
      break;

    default:
      break;
  }
 
};
