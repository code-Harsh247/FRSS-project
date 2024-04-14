const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
require('dotenv').config()
router.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        cost: req.body.cost,
        price: req.body.price,
        category: req.body.category,
        stock:req.body.stock
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});

router.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({
        success: true,
        name: req.body.name
    });
});

router.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

router.get('/:productID', async (req, res) => {
    const { productID } = req.params;

    try {
        let product = await Product.findOne({ _id: productID }); 

        if (product) {
            console.log(`Product ${productID} fetched`);
            res.send(product);
        } else {
            res.status(404).send({ message: "Product not found" });
        }
    } catch (error) {
        // Catch any errors that occur during the query
        console.error(`Error fetching product ${productID}:`, error);
        res.status(500).send({ message: "Error fetching product details" });
    }
});

router.get('/searchproductname/:productName', async (req, res) => {
    const { productName } = req.params;

    try {
        let products = await Product.find({ name: productName }); 
        if (products.length > 0) {
            console.log(`Products with name ${productName} fetched`);
            res.send(products);
        } else {
            res.status(404).send({ message: "No products found with the given name" });
        }
    } catch (error) {
        // Catch any errors that occur during the query
        console.error(`Error fetching products with name ${productName}:`, error);
        res.status(500).send({ message: "Error fetching product details" });
    }
});

router.get('/searchproductcategory/:categoryName', async (req, res) => {
    const { categoryName } = req.params;

    try {
        let products = await Product.find({ category: categoryName }); 

        if (products.length > 0) {
            console.log(`Products in category ${categoryName} fetched`);
            res.send(products);
        } else {
            res.status(404).send({ message: "No products found in the given category" });
        }
    } catch (error) {
        // Catch any errors that occur during the query
        console.error(`Error fetching products in category ${categoryName}:`, error);
        res.status(500).send({ message: "Error fetching product details" });
    }
});

router.put('/updateproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;

        // Find the product by ID and update its details
        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            { $set: updatedProductData },
            { new: true } // To return the updated document
        );

        if (updatedProduct) {
            res.json({ success: true, product: updatedProduct });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.post('/addcomment/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const { rating, commentTitle, comment } = req.body;

        // Find the product by ID
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Add the new comment to the comments array
        product.comments.push({ rating,commentTitle,comment });

        // Save the updated product document
        await product.save();

        res.json({ success: true, message: "Comment added successfully", product });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});




module.exports = router;
