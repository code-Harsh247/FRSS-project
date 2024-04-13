const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product=require("../models/Product");

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new Admin({
            email,
            passwd: hashedPassword,
            isAdmin: true // Set isAdmin to true for admin users
        });

        await newUser.save();

        // Generate a token for the newly signed up admin user
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});



router.post('/login', async (req, res) => {
    try {
        const user = await Admin.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, errors: "No Admin with the given email found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.passwd);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, errors: "Wrong password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

module.exports = router;