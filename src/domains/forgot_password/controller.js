const User = require("./../user/model");
const {sendOTP , verifyOTP , deleteOTP} = require("./../otp/controller");
const {hashData} = require("./../../util/hashData");
const { hash } = require("bcrypt");

const resetUserPassword = async ({email,otp,newPassword}) =>{
    try {
        //verify OTP
        const validOTP = await verifyOTP({email,otp});
        if(!validOTP){
            throw Error("Invalid OTP Check your inbox.");
        }

        //now update user record with updated OTP
        if(newPassword.length<8){
            throw Error("Password is too short");
        }
        //to hash the password
        const hashedNewPassword = await hashData(newPassword);
        // update user data with new hashed password
        await User.updateOne({email},{password:hashedNewPassword});
        // OTP roll finish so now delete OTP
        await deleteOTP(email);
        // all purpose solved now so lets return 
        return;
    } catch (error) {
        throw error;
    }
};


// OTP generate and email for Resetting the password
const sendPasswordResetOTPEmail = async(email) => {
try {
    //check if any account exist
    const existingUser = await User.findOne({email});
    if(!(existingUser)){
        throw Error("There's no account for provided email.");
    }

    if(!existingUser.verified){
        throw Error("Email hasn't been verified yet , Please check your inbox.");
       }

    const otpDetails = {
        email,
        subject: "Password Reset",
        message: "Enter the below code to reset your password.",
        duration:1,
    }
    
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;

} catch (error) {
    throw error;
}

};

module.exports = {sendPasswordResetOTPEmail,resetUserPassword};