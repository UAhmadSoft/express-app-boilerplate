const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const htmlToText = require('html-to-text');

const sendMail = async (options) => {
  // 1 Create Transportor
  const transportor = nodeMailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.Sendgrid_Username,
      pass: process.env.Sendgrid_Password,
    },
  });

  // 2 Render HTML Based on ejs template
  const html = await ejs.renderFile(
    `${__dirname}/../views/email/${options.template}`,
    {
      user: options.user,
      url: options.url,
    }
  );

  // console.log(html);

  // 3 Define Mail Options
  const mailOptions = {
    from: process.env.Email_From,
    to: options.email,
    subject: options.subject,
    // text: htmlToText.fromString(html),
    html,
  };

  // 4 Send Email
  await transportor.sendMail(mailOptions);
};

module.exports = sendMail;
