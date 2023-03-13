const User = require("./../user/model");
const {sendOTP , verifyOTP ,deleteOTP} = require("./../otp/controller");

// verify email after receiving OTP
const verifyUserEmail = async ({email,otp}) =>{
    try {
        const validOTP = await verifyOTP({email,otp});
        if(!validOTP){
            throw Error("Invalid Code is Passed check your email inbox.");
        }
        await deleteOTP(email);
        return;
    } catch (error) {
        throw error;
    }
}

// send verification email having OTP
const sendVerificationOTPEmail = async (email) =>{
    try {
//check if an account exists   
        const existingUser = await User.findOne({email});
        if(!existingUser){
             throw Error("There is no account for the provided email");

        }

        const otpDetails = {
            email,
            subject:"Email Verification",
            message:"Verify Your Email with the code below ",
            duration:1,

        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;

    } catch (error) {
        throw error;
    }
};

module.exports = {sendVerificationOTPEmail,verifyUserEmail};