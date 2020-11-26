const nodemailer = require('nodemailer');
const {Liquid} = require('liquidjs');
const path = require('path');
const forEach = require('async-foreach').forEach;
const engine = new Liquid({
  root: path.resolve(__dirname),
  extname: '.liquid',
});


/**
 * To send emails
 * @param {Array} emails
 * @param {String} Summary
 * @param {Sting} Date
 */
export const sendMail = (emails, Summary, Date) =>{
  forEach(emails, async function(email) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    // eslint-disable-next-line no-invalid-this
    const done = this.async();
    const mailoption = {
      from: process.env.MAIL_ID,
      to: email,
      subject: subject,
      html: await engine
          .renderFile('emailTemplate', {name: email, summary: Summary, date: Date}),
    };

    transporter.sendMail(mailoption, function(err, resp) {
      if (err) {
        console.log('Error');
      } else {
        console.log('Email sent');
        done();
      }
    });
  });
};
