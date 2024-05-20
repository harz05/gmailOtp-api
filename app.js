const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '110254983815-sn7impk043p27aqdqkeeftfnnker7mo8.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//047cg-yPFPaS0CgYIARAAGAQSNwF-L9IrYA2M1QWMuBz7gJwLC7KIKgtSpS__p4TP-faTRFCDAV8f9TGl94Df8e-gt3R5Z5Cy3iA';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'harsh2005.hc@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Harsh Chauhan <harsh2005.hc@gmail.com>',
      to: 'harsh119402.hc@gmail.com',
      subject: 'Hello subject',
      text: 'Hello bro',
      html: '<h1>Hello from gmail email using API</h1>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

sendMail()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));
