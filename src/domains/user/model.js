const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    // mobile: {type:String, unique:true},
    email:{type:String, unique:true},
    password:String,
    token: String,
    verified:{
        type: Boolean,
        default:false
    },

});

const User = mongoose.model("User",UserSchema);

module.exports = User;