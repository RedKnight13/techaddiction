const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
let nodemailer = require("nodemailer");

app = express();

 // index.js


 const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kvhjbjidupaqtcfn@ethereal.email',
      pass: '1HZCGs2BQc88xBFgVf'
  },
  tls: { rejectUnauthorized: false }
});
 // schedule tasks to be run on the server   
 cron.schedule("* * * * *", function(){
  console.log("---------------------");
  console.log("Running Cron Job");
  let mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
});

app.listen("3200");
 