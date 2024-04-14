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


router.post('/empty-orders', async (req, res) => {
    try {
        // Find the admin
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ success: false, errors: "Admin not found" });
        }

        // Empty the order array
        admin.Order = [];

        // Save the updated admin
        await admin.save();

        res.json({ success: true, message: "Order array of admin emptied successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.post('/empty-notifications', async (req, res) => {
    try {
        // Find the admin
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ success: false, errors: "Admin not found" });
        }

        // Empty the notification array
        admin.Notification = [];

        // Save the updated admin
        await admin.save();

        res.json({ success: true, message: "Notification array of admin emptied successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/orders', async (req, res) => {
    try {
        // Find the admin
        const admin = await Admin.findOne({ isAdmin: true });
        
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        // Retrieve the order array from the admin document
        const orders = admin.Order;
        
        res.status(200).json({ orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/notifications', async (req, res) => {
    try {
        // Find the admin
        const admin = await Admin.findOne({ isAdmin: true });
        
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        // Retrieve the notifications array from the admin document
        const notifications = admin.Notification;
        
        res.status(200).json({ notifications: notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;