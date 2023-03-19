const OTP = require("./model");
const generateOTP = require("./../../util/generateOTP");
const sendEmail = require("./../../util/sendEmail");
const {hashData,verifyHashedData} = require("./../../util/hashData");
const {AUTH_EMAIL} = process.env;
var expiresAt ;

// verify OTP 
const verifyOTP = async ({email,otp})=>{
    try {
        if(!(email && otp)){
            throw Error ("Provide values for email, otp ");
        }
        // ensure OTP record exist 
        const matchedOTPRecord = await OTP.findOne({
            email,
        });

        if(!matchedOTPRecord){
            throw Error("No OTP record found.");
        }

        const {expiresAt} = matchedOTPRecord; // such type { } define means calling one function data in other function
        console.log(expiresAt);
        // checking for expired code 
        if(expiresAt < Date.now ()){
            await OTP.deleteOne({email});
            throw Error("code has expired, Request for new One");
        }

        // not expired yet verify value
        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashedData(otp,hashedOTP);
        return validOTP;     

    } catch (error) {
        throw error;
    }
};

// this will create new OTP and using 4 input will send that random OTP
const sendOTP = async ({email,subject,message,duration=1})=>{
    try {
        if(!(email&&subject&&message)){
            throw Error("provide value for email , subject and message");
              
        }
// clear old record
        await OTP.deleteOne({email});
        // generate otp pin 
        const generatedOTP = await generateOTP();
        // send email 
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html:`<p>${message}</p><p style="color:tomato;
            font-size:25pxl letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This Code <b>
            expires in ${duration} hour(s)</b>.</p>`,
        };
        await sendEmail(mailOptions);

        //save OTP record
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp:hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now()+3600000*duration,
            });
           
       const createdOTPRecord = await newOTP.save();
       return createdOTPRecord;

    } catch (error) {
       throw error; 
    }
};

const deleteOTP = async (email)=>{
    try {
        await OTP.deleteOne({email});
    } catch (error) {
        throw error;
        
    }
};

module.exports = {sendOTP,verifyOTP,deleteOTP}