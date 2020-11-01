const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path')
const { host, port, user, pass } = require('../config/mail.json')



var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "749af70a7b78d8",
    pass: "37e896b5572fd6"
  }
});

  transport.use('compile', hbs({
    viewEngine: { 
        defaultLayout: false,
        partialsDir: path.resolve('./src/resources/mail/')
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html',
}));






module.exports = transport;  