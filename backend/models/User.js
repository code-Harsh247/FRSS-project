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
            },
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
            Price:{
                type:Number
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
            Status:{
                type:String,
                enum:['active','inactive','pending'],
                default: 'active'
            },
            Loan:{
                type: Number,
                default:0
            },
            orderId:{
                type:Number
            },
            Damaged:{
                type:Boolean,
                default: false
            }
        }],
        default: []
    },
    Notification:{
        type:[{
            Message:{
                type:String,
            },
            Date:{
                type:Date,
                default:Date.now
            }
        }],
        default:[]
    }
});

UserSchema.methods.calculateDueTime = function() {
    this.Rented.forEach(item => {
        if (item.Status === 'active') {
            const rentDurationMonths = item.RentDuration; // Rent duration in months
            const startDate = new Date(item.Date); // Date the product was rented
            const currentDate = new Date(); // Current date
            
            // Calculate total days rented
            const totalDaysRented = Math.floor((currentDate - startDate) / (24* 60 * 60 * 1000));

            // Calculate total days based on rent duration in months
            const totalDaysRentDuration = rentDurationMonths ; // Assuming each month has 30 days

            // Calculate remaining days
            const daysRemaining = totalDaysRentDuration - totalDaysRented;

            // Update TimeDue field with the calculated due time in days
            item.TimeDue = daysRemaining;
        }
    });
    // Save the changes to the user document
    return this.save();
};

UserSchema.methods.calculateLoan = function() {
    this.Rented.forEach(item => {
        if (item.Status === 'active') {
            const rentDuration = item.RentDuration; // Rent duration in months
            const startDate = new Date(item.Date); // Date the product was rented
            const currentDate = new Date(); // Current date
            
            // Calculate due time in months
            const dueTime = rentDuration - Math.floor((currentDate - startDate) / (30 * 24 * 60 * 60 * 1000));

            // If due time is negative, calculate loan
            if (dueTime < 0) {
                item.Loan = Math.abs(dueTime) * item.Quantity * item.Price;
            } else {
                item.Loan = 0; // If due time is not negative, set loan to 0
            }
        } else {
            item.Loan = 0; // If status is not 'active', set loan to 0
        }
    });
    // Save the changes to the user document
    return this.save();
};


const User = mongoose.model("User", UserSchema);
module.exports = User;
