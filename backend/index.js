const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require('console');

app.use(express.json);
app.use(cors());

//Database connection
mongoose.connect("mongodb+srv://Harsh:lxBEGLqhWGM1TGc6@frss-project-dbcluster.ezcyfh4.mongodb.net/frssProject")

//API Creation

app.get("/",(req,res)=>{
    res.send("App is running");
})


app.listen(port,(error)=>{
    if(!error){
        console.log(`Server running on port ${port}`)
    }else{
        console.log(`Error : ${error}`)
    }
})