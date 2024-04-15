const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require("../models/Product")
const Admin = require("../models/Admin");

router.post('/signup', async (req, res) => {
    try {
        let checkEmail = await User.findOne({ email: req.body.email });
        let checkPhone = await User.findOne({ phone: req.body.phone });

        if (checkEmail) {
            return res.status(400).json({ success: false, errors: "A user with this email already exists" });
        }

        if (checkPhone) {
            return res.status(400).json({ success: false, errors: "A user with this phone number already exists" });
        }

        let cart = {};
        for (let i = 0; i < 100; i++) {
            cart[i] = 0;
        }

        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            passwd: hashPassword,
            cartData: cart,
        });
        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, `${process.env.SECRET_KEY}`);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, errors: "No user with the given email found" });
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

router.post('/get-user-id', async (req, res) => {
    try {
        // Get the token from the request body
        const token = req.body.token;

        // Check if the token exists
        if (!token) {
            return res.status(400).json({ success: false, errors: "Token is required" });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                // If the token is invalid or expired, return an error response
                return res.status(401).json({ success: false, errors: "Invalid token" });
            }

            // Extract the user ID from the decoded token
            const userId = decoded.id;

            // Return the user ID in the response
            res.status(200).json({ success: true, userId: userId });
        });
    } catch (error) {
        // Handle server errors
        console.error(error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/allusers', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/user/:name', async (req, res) => {
    try {
        const user = await User.find
    }
    catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Find and delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);

        // Check if user exists and send appropriate response
        if (!deletedUser) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // If user was successfully deleted, send success response
        res.json({ success: true, message: 'User deleted successfully', deletedUser });
    } catch (error) {
        // If there's any error, send server error response
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/search/:name', async (req, res) => {
    try {
        const userName = req.params.name;

        // Find user(s) with the provided name
        const users = await User.find({ name: userName });

        // Check if user(s) exist and send appropriate response
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, errors: "No users found with the given name" });
        }

        // If user(s) found, send success response with user(s)
        res.json({ success: true, users });
    } catch (error) {
        // If there's any error, send server error response
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Retrieve cart data from user object
        const cartData = user.cartData;

        // Return the cart data
        res.status(200).json({ success: true, cartData: cartData });
    }
    catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.put('/update-cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const { id, count, duration } = req.body.cartItem; // Destructure cartItem from request body
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Find the index of the product in cartData array by its ID
        const index = user.cartData.findIndex(item => item.id === id);

        // If the product is found, update its count and duration
        if (index !== -1) {
            user.cartData[index].count = count;
            user.cartData[index].duration = duration;
        } else {
            // If the product is not found, you can choose to handle it as per your application logic
            // For example, you can add the product to the cart here
            user.cartData.push({ id, count, duration });
        }

        await user.save();

        res.json({ success: true, message: "Cart updated successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});



router.post('/add-to-cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId;
        console.log(productId);
        const quantity = req.body.quantity;
        const rentDuration = req.body.duration;

        // Find the user by ID
        const user = await User.findById(userId);
        // console.log(user);
        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Check if the product already exists in the cart
        const productIndex = user.cartData.findIndex(item => item.id === productId);
        // console.log(productIndex);
        if (productIndex !== -1) {
            // If the product already exists in the cart, update its quantity
            user.cartData[productIndex].count = quantity;
            user.cartData[productIndex].duration = rentDuration;
        } else {
            // If the product doesn't exist in the cart, add it with product id and count
            const product = {
                id: productId,
                count: quantity,
                duration: rentDuration
            };
            console.log(product);
            // Push the product into the cartData array
            user.cartData.push(product);
        }

        // Save the updated user object
        await user.save();

        res.json({ success: true, message: "Product added to cart successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});



router.delete('/empty-cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Empty the cartData array
        user.cartData = [];

        // Save the updated user object
        await user.save();

        res.json({ success: true, message: "Cart emptied successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.delete('/delete-product/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }
        console.log(user);
        // Find the index of the product in the cartData array
        const productIndex = user.cartData.findIndex(item => item.id == productId);
        // console.log(productIndex);

        // Check if the product exists in the cart
        if (productIndex === -1) {
            return res.status(404).json({ success: false, errors: "Product not found in the user's cart" });
        }

        // Remove the product from the cartData array
        user.cartData.splice(productIndex, 1);

        // Save the updated user object
        await user.save();

        res.json({ success: true, message: "Product deleted successfully from the user's cart", user });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});


router.post('/rent/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const duration = req.body.duration;
        const price = req.body.price;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;
        const phone = req.body.phone;
        const email = req.body.email;
        const zipcode = req.body.zipcode;
        const country = req.body.country;
        const userName = req.body.userName;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Find the product by ID
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ success: false, errors: "Product not found" });
        }

        // Check if requested quantity is available in stock and product is available
        if (product.stock < quantity || !product.available) {
            return res.status(400).json({ success: false, errors: "Requested quantity not available in stock" });
        }
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(500).json({ success: false, errors: "Admin not found" });
        }
        let id;
        if (admin.Order.length > 0) {
            let last_order_array = admin.Order.slice(-1);
            let last_order = last_order_array[0];
            if(last_order){
                id = last_order.OrderID + 1;
            }
            else id =1;
        }
        else {
            id = 1;
        }

        // Update user's rented items
        const rentedProduct = {
            ProductId: productId,
            Quantity: quantity,
            RentDuration: duration,
            Price: price,
            Status: 'active',
            TimeDue: duration,
            orderId: id
        };
        user.Rented.push(rentedProduct);

        // Update product's stock and units rented
        product.unitsRented += quantity;
        product.stock -= quantity;


        const newOrder = {
            OrderID: id,
            image: product.image[0],
            ProductID: product.id,
            Username: userName,
            UserID: email,
            Duration: duration,
            Price: price,
            Quantity: quantity,
            Street: street,
            City: city,
            Province: province,
            Phone: phone,
            Email: email,
            ZipCode: zipcode,
            Country: country,

        };
        admin.Order.push(newOrder);

        // Check if stock falls below threshold and update availability
        if (product.stock < 20) {
            product.available = false;
            const newNotification = {
                image: product.image[0],
                ProductID: product.id,
                ProductName: product.name,
                Quantity: product.stock
            };
            admin.Notification.push(newNotification);
        }

        // Save changes to user, product, and admin
        await user.save();
        await product.save();
        await admin.save();

        res.json({ success: true, message: "Product rented successfully", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.get('/rented/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const rentedItems = user.Rented;

        res.status(200).json({ success: true, rentedItems: rentedItems });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.post('/rent/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const street = req.body.street;
        const city = req.body.city;
        const province = req.body.province;
        const phone = req.body.phone;
        const email = req.body.email;
        const zipcode = req.body.zipcode;
        const country = req.body.country;
        const userName = req.body.userName;
        const cartItems = req.body.cartItems; // Assuming cartItems is an array of objects containing productId, quantity, duration, price, etc.

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Initialize an array to store orders for the admin
        const adminOrders = [];
        const admin = await Admin.findOne();
        let temp=1;
        const lastOrder = admin.Order[admin.Order.length - 1];
        let lastOrderID = lastOrder ? lastOrder.OrderID : 0 ;
        // Iterate through each item in the cart
        for (const cartItem of cartItems) {
            const productId = cartItem.id;
            const quantity = cartItem.count;
            const duration = cartItem.duration;
            const price = cartItem.price;

            // Find the product by ID
            const product = await Product.findOne({ id: productId });
            if (!product) {
                return res.status(404).json({ success: false, errors: "Product not found" });
            }
            else console.log("product found : ", productId);

            // Check if requested quantity is available in stock and product is available
            if (product.stock < quantity || !product.available) {
                return res.status(400).json({ success: false, errors: "Requested quantity not available in stock" });
            }
            
            let id = lastOrderID + temp;
            temp=temp+1;

            

            // Update user's rented items
            const rentedProduct = {
                ProductId: productId,
                Quantity: quantity,
                RentDuration: duration,
                Price: price,
                Status: 'active',
                TimeDue: duration,
                orderId: id
            };
            user.Rented.push(rentedProduct);

            // Update product's stock and units rented
            product.unitsRented += quantity;
            product.stock -= quantity;

            // Create an order for the admin
            const newOrder = {
                OrderID: id,
                image: product.image[0],
                ProductID: productId,
                Username: userName, // Assuming user has a userName property
                UserID: email, // Assuming user has an email property
                Duration: duration,
                Price: price,
                Quantity: quantity,
                Street: street,
                City: city,
                Province: province,
                Phone: phone,
                Email: email,
                ZipCode: zipcode,
                Country: country,
            };
            adminOrders.push(newOrder);

            // Check if stock falls below threshold and update availability
            if (product.stock < 20) {
                product.available = false;
                const newNotification = {
                    image: product.image[0],
                    ProductID: product.id,
                    ProductName: product.name,
                    Quantity: product.stock
                };
                if (admin) {
                    admin.Notification.push(newNotification);
                    await admin.save();
                }
            }

            // Save changes to product
            await product.save();
        }

        // Save changes to user
        await user.save();

        if (!admin) {
            return res.status(500).json({ success: false, errors: "Admin not found" });
        }
        admin.Order = admin.Order.concat(adminOrders);
        await admin.save();

        res.json({ success: true, message: "Products rented successfully", user });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});



// API endpoint to update the loan of the rented product
router.put('/update-loan/:userId/:productId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const productId = parseInt(req.params.productId); // Convert productId to integer
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        // Find the rented product in the user's Rented array
        const rentedProduct = user.Rented.find(item => item.ProductId === productId);

        // Check if the rented product exists
        if (!rentedProduct) {
            return res.status(404).json({ success: false, errors: "Rented product not found" });
        }

        // Calculate loan if TimeDue is negative
        if (rentedProduct.TimeDue < 0) {
            const price = rentedProduct.price; // Replace with the actual price of the product
            const quantity = rentedProduct.Quantity;
            const loan = (price + 0.15 * price) * Math.abs(rentedProduct.TimeDue) * quantity;

            // Update the loan of the rented product
            rentedProduct.Loan = loan;

            // Save the changes to the user document
            await user.save();

            return res.json({ success: true, message: "Loan updated successfully", loan });
        } else {
            return res.json({ success: false, message: "TimeDue is not negative, loan remains unchanged" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});

router.post('/add-notification/:userId', async (req, res) => {
    const userId = req.params.userId;
    const message = req.body.message; // Assuming the request body contains the 'message' for the notification
    // console.log(message);
    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the notification to the user's notification array
        const newNotification = {
            Message: message
        }
        user.Notification.push(newNotification);
        // Save the user with the updated notification array
        await user.save();

        res.status(200).json({ message: "Notification added successfully", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/notifications/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Retrieve the notifications from the user document
        const notifications = user.Notification.reverse();

        res.status(200).json({ notifications: notifications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/time-due/:userId/:orderId', async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the order by ID in the user's rented array
        const order = user.Rented.find(order => order._id.toString() === orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if live status is true
        if (order.Status === 'active') {
            // Calculate time due in months
            const rentDuration = order.RentDuration; // Rent duration in months
            const startDate = new Date(order.Date); // Date the product was rented
            const currentDate = new Date(); // Current date
            const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
            const timeDue = rentDuration - monthsDiff;

            res.json({ timeDue: timeDue });
        } else {
            res.json({ message: "Order is not active" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get('/total-loan/:userId/:orderId', async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the order by ID in the user's rented array
        const order = user.Rented.find(order => order._id.toString() === orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Calculate total loan
        let totalLoan = 0;

        if (order.Status === 'active') {
            const rentDuration = order.RentDuration; // Rent duration in months
            const startDate = new Date(order.Date); // Date the product was rented
            const currentDate = new Date(); // Current date
            const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
            const timeDue = rentDuration - monthsDiff;

            // If time due is negative, calculate total loan
            if (timeDue < 0) {
                totalLoan = Math.abs(timeDue) * order.Quantity * order.Price;
            }
        }

        res.json({ totalLoan: totalLoan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;
