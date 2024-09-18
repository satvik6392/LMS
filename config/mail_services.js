const nodemailer = require('nodemailer');
const emailTemplates = require('./email_templates');
require('dotenv').config();


/* Method to send email to user
- arguments:
-email: email id of receiver
- subjectTitle : subject of mail
- emailHTML : html content template of email body
- attachments: attachment for email
*/
exports.sendEmail = async function(email, subjectTitle, emailHTML, attachments) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subjectTitle,
        html: emailHTML,
        attachments: attachments
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


