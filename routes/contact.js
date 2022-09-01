const nodemailer = require("nodemailer");
const path = require('path');
const express = require('express');
const router = express.Router();
router.get('/contact', (req, res) => {
    return res.render('contact')
})
router.post('/contact', (req, res) => {
    const output = `
  <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
       <li>Phone: ${req.body.phone}</li>
       <li>Email: ${req.body.email}</li>
     </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;
let transporter = nodemailer.createTransport({
 service:'gmail',
      auth: {
        user: 'mulerselinger@gmail.com', 
        pass: 'vpnw dwma yhkg tgrt'  
    }
  });
let mailOptions = {
      from: req.body.email, 
      to: 'mulerselinger@gmail.com', 
  subject: `Message from contact form👻:- ${req.body.subject}:<${req.body.email}>`, 
      text: 'Hello world?', 
      html: output 
  };
transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      else {
        res.render('contact', {
    message: 'Your Email has been sent,we will communicate soon!'
  });
      }
  console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  });

module.exports =router;