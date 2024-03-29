require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require('console');
const Product=require('./models/Product');
const User=require('./models/User');

app.use(express.json());
app.use(cors());

//Database connection
mongoose.connect(`${process.env.DB_CONN}`)

//API Creation
app.get("/",(req,res)=>{
    res.send("App is running");
})

//Image Storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload  = multer({storage})

//Upload Endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success: 1,
        image_url:`http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    }
    else{
       id=1; 
    }
    const product=new Product({
        id:id,
        name: req.body.name,
        description:req.body.description,
        image:req.body.image,
        cost:req.body.cost,
        price:req.body.price,
        category:req.body.category,
        available:req.body.available,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})
//Createing the API for deleteing product from database
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for getting all products

app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})
// API for Signu

app.post('/signup',async(req,res)=>{
    let checkEmail=await User.findOne({email:req.body.email});
    let checkPhone=await User.findOne({phone:req.body.phone});
    if(checkEmail){
        alert("A user with the same Email already exists.")
        return res.status(400).json({success:false,errors:"user with this email already exists"});
    }
    if(checkPhone){
        alert("A user with the same Phone Number already exists.")
        return res.status(400).json({success:false,errors:"user with this Phone no. already exists"});
    }
    let cart={};
    for(let i=0;i<100;i++){
        cart[i]=0;
    }
    const hashPassword = await bcrypt.hash(req.body.password,10)
    const user =new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        passwd:hashPassword,
        cartData:cart,
    })

    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,`${process.env.SECRET_KEY}`);
    res.json({success:true,token})
})

//API for User login

app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, errors: "No user with the given email found" });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.passwd);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, errors: "Wrong password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        console.log(token);
        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, errors: "Server Error" });
    }
});


app.listen(process.env.PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${process.env.PORT}`)
    }else{
        console.log(`Error : ${error}`)
    }
})