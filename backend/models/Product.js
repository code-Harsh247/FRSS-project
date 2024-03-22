const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    cost:{
        type: Number,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true,
    }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
