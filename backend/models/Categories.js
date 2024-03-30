// models/Category.js

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    ImgUrl: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Category', categorySchema);
