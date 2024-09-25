const Router = require("express");
const router = Router();
const nodemailer = require("nodemailer");
const VerifyCode = require("../model/verify");
require('dotenv').config();


const getGenrateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    

});

const sendVerificationCode = (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification Code',
        text: `Your verification code is ${code}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
};


router.post("/sendCode", async (req, res) => {
    const { email } = req.body;
    const verificationCode = getGenrateVerificationCode();

    try {
        const user = await VerifyCode.findOneAndUpdate(
            { email },
            { sendCode: verificationCode },
            { upsert: true, new: true } 
        );
        await sendVerificationCode(email, verificationCode);
       return  res.status(200).json({ message: 'Verification code sent successfully', user });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while sending the verification code' });
    }
});


router.post("/verifyCode", async (req, res) => {
    const { email, sendCode } = req.body;
    try {
        const user = await VerifyCode.findOne({ email });
        if (user && user.sendCode === sendCode.toString()) {
            res.status(200).json({ message: 'Verification successful', user });
        } else {
            res.status(400).json({ message: 'Invalid verification code' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred during verification' });
    }
});

module.exports = router;
