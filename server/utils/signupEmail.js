
const axios = require('axios');
const qs = require('qs');

// Step 1: Get Access Token
const getAccessToken = async () => {
  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`;

  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
  };

  try {
    const response = await axios.post(tokenEndpoint, qs.stringify(data), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response.data);
  }
};

// Step 2: Send Email via Graph API
const sendSignupEmail = async (toEmail, subject, bodyText) => {
  const accessToken = await getAccessToken();

  const emailData = {
    message: {
      subject,
      body: {
        contentType: 'Text',
        content: bodyText,
      },
      toRecipients: [
        {
          emailAddress: {
            address: toEmail,
          },
        },
      ],
    },
    saveToSentItems: 'false',
  };

  try {
    const response = await axios.post(
      'https://graph.microsoft.com/v1.0/users/mason@consultingfirm.us/sendMail',
      emailData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Email sent successfully via Graph API!');
  } catch (err) {
    console.error('Error sending email:', err.response?.data || err.message);
  }
};

module.exports = sendSignupEmail;