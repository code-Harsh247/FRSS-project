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
    isAdmin:{
        type:Boolean,
        default:true,
    },
    Order:{
        type:[{
            image:{
                type: String,
            },
            ProductID:{
                type: Number,
            },
            Username:{
                type:String,
            },
            UserID:{
                type: String,
            },
            Duration:{
                type: Number,
            },
            Price:{
                type: Number,
            },
            Quantity:{
                type: Number,
            }
        }],
        default:[]
    },
    Notification:[{
        image:{
            type: String,
        },
        ProductID:{
            type: Number,
        },
        ProductName:{
            type: String,
        },
        Quantity:{
            type: Number
        }
    }]
});




const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
