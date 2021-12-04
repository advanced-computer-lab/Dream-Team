
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (req, res, next) => {
  req.mailOptions.from = process.env.EMAIL;
  transporter.sendMail(req.mailOptions, (error, info) => {
    if (error) {
      next(error);
    } else next();
  });
};

module.exports = { sendMail };