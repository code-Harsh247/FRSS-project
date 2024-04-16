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
            OrderID:{
                type:Number,
            },
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
            },
            Street:{
                type: String,
            },
            City:{
                type: String,
            },
            Province: {
                type: String,
            },
            Phone: {
                type: Number,
            },
            Email: {
                type: String,
            },
            ZipCode:{
                type:Number,
            },
            Country:{
                type: String
            },
            ShipStatus:{
                type: Boolean,
                default: false
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
    }],
    ReturnRequests:[{
        OrderID:{
            type:String
        },
        ProcessedStatus:{
            type:Number,
            default:-1
        }
    }]
    
});




const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
