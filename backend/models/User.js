const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwd: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    cartData: {
        type: [{
            count: {
                type: Number,
            },
            id: {
                type: Number,
            }
        }],
        default: [] // Setting default value as empty array
    },
    addresses: {
        type: [String],
        default: []
    },
    bill: {
        type: [{
            count: {
                type: Number,
            },
            id: {
                type: Number,
            },
        }],
        default: []
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    Rented: {
        type: [{
            ProductId: {
                type: Number,
                required: true
            },
            Quantity: {
                type: Number,
                required: true
            },
            RentDuration: {
                type: Number,
                required: true
            },
            Date: {
                type: Date,
                default: Date.now
            }
        }],
        default: []
    }

});

const User = mongoose.model("User", UserSchema);
module.exports = User;
