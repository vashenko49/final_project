const nodemailer = require("nodemailer");

module.exports = async (toEmail, subject, html)=>{

  const transporter = nodemailer.createTransport({
    service: process.env.nodemailer_service,
    auth: {
      user: process.env.nodemailer_email,
      pass: process.env.nodemailer_password
    }
  });

  const mailOptions = {
    from: process.env.nodemailer_email,
    to: toEmail,
    subject: subject,
    html: html
  };


  await transporter.sendMail(mailOptions);
};
