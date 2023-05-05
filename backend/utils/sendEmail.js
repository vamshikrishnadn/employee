const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // mail sending through nodemailer
  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: process.env.THE_EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const content = {
    from: `Shopit ${process.env.THE_EMAIL}`,
    // to: `${newOrders.user.userEmail}, enquiry@multiplexurbangreen.com `,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(content, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Sent: ' + info.response);
  });
};

module.exports = sendEmail;
