const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    passwd:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    cartdata:{
        type:Object,
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
