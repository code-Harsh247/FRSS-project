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
            id: {
                type: Number,
            },
            count: {
                type: Number,
                
            },
            duration:{
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
            id: {
                type: Number,
            },
            count: {
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
                type: Number
                
            },
            Quantity: {
                type: Number,
                
            },
            RentDuration: {
                type: Number,
                
            },
            Date: {
                type: Date,
                default: Date.now
            },
            TimeDue:{
                type:Number
            },
            Live:{
                type:Boolean,
                default:true
            },
            Loan:{
                type: Number,
                default:0
            }
        }],
        default: []
    }
});

UserSchema.methods.calculateDueTime = function() {
    this.Rented.forEach(item => {
        const rentDuration = item.RentDuration; // Rent duration in months
        const startDate = item.Date; // Date the product was rented
        const currentDate = new Date(); // Current date
        
        // Calculate due time in months
        const dueTime = rentDuration - Math.floor((currentDate - startDate) / (30 * 24 * 60 * 60 * 1000));
        
        // Update TimeDue field with the calculated due time
        item.TimeDue = dueTime;
    });
    // Save the changes to the user document
    return this.save();
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
