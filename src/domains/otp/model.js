const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
     otp: String,
     createdAt: Date,
     expiresAt: Date,
});
// whatever name you give here same with s will be used in mongoDB
const OTP = mongoose.model("OTP",OTPSchema);

module.exports = OTP;