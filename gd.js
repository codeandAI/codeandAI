const express = require('express');
const bodyParser = require('body-parser');
const sendgrid = require('@sendgrid/mail');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

// Initialize SendGrid with your API key
sendgrid.setApiKey('YOUR_SENDGRID_API_KEY');

// Simulated database
const users = {};

// Registration endpoint
app.post('/register', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    users[email] = { verified: false, token };

    // Send verification email
    const verificationLink = `http://yourwebsite.com/verify?token=${token}`;
    const msg = {
        to: email,
        from: 'noreply@yourwebsite.com',
        subject: 'Verify Your Email Address',
        text: `Please click the following link to verify your email address: ${verificationLink}`,
    };
    sendgrid.send(msg)
        .then(() => {
            res.send('Verification email sent');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Failed to send verification email');
        });
});

// Verification endpoint
app.get('/verify', (req, res) => {
    const { token } = req.query;
    const user = Object.values(users).find(u => u.token === token);
    if (!user) {
        return res.status(400).send('Invalid token');
    }
    user.verified = true;
    res.send('Email verified successfully');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
