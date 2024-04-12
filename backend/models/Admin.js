const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwd: {
        type: String,
        required: true,
    },
    Order:{
        type:[{
            image:{
                type: String,
                required:true,
                validate: [ImgarrayLimit, '{PATH} exceeds the limit of 4'],
            },
            ProductID:{
                type: Number,
                required: true
            },
            Username:{
                type:String,
                required: true
            },
            UserID:{
                type: String,
                required: true
            },
            Duration:{
                type: Number,
                required: true
            },
            Price:{
                type: Number,
                required: true
            },
            Quantity:{
                type: Number,
                required: true
            }
        }],
        default:[]
    },
    Notification:[{
        image:{
            type: String,
            required: true,
            validate: [ImgarrayLimit, '{PATH} exceeds the limit of 4'],
        },
        ProductID:{
            type: Number,
        },
        ProductName:{
            type: Number,
        },
        Quantity:{
            type: Number
        }
    }]
});



const Admin = mongoose.model("User", AdminSchema);
module.exports = Admin;
