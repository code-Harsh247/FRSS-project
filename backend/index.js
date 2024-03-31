require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const categoriesRoutes = require('./Routes/CategoriesRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(`${process.env.DB_CONN}`);

// API Creation
app.get('/', (req, res) => {
    res.send('App is running');
});


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/categories',categoriesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
