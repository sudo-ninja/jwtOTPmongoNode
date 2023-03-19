const generateOTP = async () =>     {
try {
    // console.log(Math.round(otp=`${100000+Math.random()*9000}`));
    return (otp=`${Math.floor(100000+Math.random()*900000)}`);
} catch (error) {
    throw error;
}
};
// this will generate random number of 6 digit , just by calling generate OTP . no need to pass any 
//parameter

module.exports = generateOTP;