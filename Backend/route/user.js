const Router = require("express");
const User = require("../model/user");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();


router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const accountCreate = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        const token = jwt.sign({ userId: accountCreate._id }, process.env.secretKey, { expiresIn: "2d" });
        return res.status(200).json({ message: "Account created successfully", accountCreate, token });
    } catch (error) {
        return res.status(500).json({ message: "Error during account creation", error });
    }
});


router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
       
        if (!user) {
            return res.status(404).json({ message: "Account not found" });
        }
        
        const isPassword = await bcrypt.compare(password, user.password);
        
        if (!isPassword) {
            return res.status(401).json({ msg: "Password does not match" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: "2d" });
        return res.status(200).json({ message: "Signin successful", token, user });
    } catch (error) {
        return res.status(500).json({ message: "Signin error", error });
    }
});


router.put("/changePassword/:_id", async (req, res) => {
    const { _id } = req.params;
    const { password } = req.body;

   
    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userUpdate = await User.updateOne(
            { _id: _id },  
            { $set: { password: hashedPassword } }
        );

        if (userUpdate.nModified === 0) {
            return res.status(400).json({ error: 'Password update failed' });
        }

        return res.status(200).json({ message: 'Password updated successfully', userUpdate });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', error });
    }
});

module.exports = router;
