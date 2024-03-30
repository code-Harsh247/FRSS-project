const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
require('dotenv').config()
const multer=require('multer')
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
        available: req.body.available,
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
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    });
});

router.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});

// const path = require('path');

// const storage=multer.diskStorage({
//     destination:'./upload/images',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldnmae}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload=multer({storage:storage})
// router.use('/images',express.static('upload/images'))
// router.post("/upload",upload.single('product'),(req,res)=>{
//     console.log(req.file.filename);
//     res.json({
//         success:1,
//         image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
//     })
// })

// const path = require('path');

// const storage = multer.diskStorage({
//     destination: './upload/images',
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ storage: storage });

// router.use('/images', express.static('upload/images'));

// router.post("/upload", upload.single('product'), (req, res) => {
//     console.log(req.file.filename);
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
//     });
// });

// const path = require('path');

// // Assuming the 'upload' folder is in the same directory as the 'Routes' folder
// const uploadDir = path.join(__dirname, '../upload'); // Construct the absolute path to the 'upload' folder

// const storage = multer.diskStorage({
//     destination: path.join(uploadDir, 'images'), // Adjust the destination path
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ storage: storage });

// // Adjust the static file serving path
// router.use('/images', express.static(path.join(uploadDir, 'images')));

// router.post("/upload", upload.single('product'), (req, res) => {
//     console.log(req.file.filename);
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
//     });
// });




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

module.exports = router;
