require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const categoriesRoutes = require('./Routes/CategoriesRoutes');
const adminRoutes = require('./Routes/AdminRoutes');
const multer = require('multer');


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
app.use('/admin',adminRoutes);

const path = require('path');

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    console.log(req.file.filename);
    res.json({
        success:1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
