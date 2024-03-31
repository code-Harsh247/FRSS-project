
const express = require('express');
const router = express.Router();
const Category = require('../models/Categories');
const Product = require('../models/Product');


router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/addCategory', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
        ImgUrl: req.body.ImgUrl,
    });

    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:name', async (req, res) => {
    try {
        const categoryName = req.params.name;


        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }


        const products = await Product.find({ category: categoryName });


        for (const product of products) {
            await product.remove();
        }


        await category.remove();

        res.json({ message: 'Category and associated products deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
