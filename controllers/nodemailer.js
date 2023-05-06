const nodemailer = require("nodemailer");
require("dotenv").config;

async function main({ email }) {
  let testAccount = await nodemailer.createTestAccount();
  
  let transporter = nodemailer.createTransport({
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  
  /* if we want to use ethereal for development we need to add host: "smtp.ethereal.email" and remove service */

  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Register complete ✔", // Subject line
    text: "Plaintext version of the message", // plain text body
    html: "<b>Hola sapo 🐸, bienvenido en nuestra pagina web</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = main;
