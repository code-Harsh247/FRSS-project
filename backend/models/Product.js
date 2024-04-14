const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        // required: true
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
        type: [String],
        required: true,
        validate: [ImgarrayLimit, '{PATH} exceeds the limit of 4'],
    },
    ratings:{
        type: Number,
        default: 0
    },
    comments: [{
        rating: {
            type: Number,
            // required: true,
            min: 0, // 0 is the lowest rating
            max: 5, // 5 is the highest rating
        },
        commentTitle:{
            type: String
        },
        comment: {
            type: String,
            // required: true,
        }
    }],
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
    unitsRented: {
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        required:true
    },
    available: {
        type: Boolean,
        default: true,
    }
});

function ImgarrayLimit(val) {
    return val.length <= 4; //limits the number of image URLs to 4
  }

// Middleware to calculate average rating before saving
ProductSchema.pre('save', function(next) {
    if (this.comments.length > 0) {
        const sum = this.comments.reduce((acc, {rating}) => acc + rating, 0);
        this.ratings = sum / this.comments.length;
    } else {
        this.ratings = 0; // Default to 0 if no comments are present
    }
    next();
});

ProductSchema.pre('save', function(next) {
    if (this.stock > 20) {
        this.available = true;
    }
    else{
        this.available=false;
    }
    next();
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
