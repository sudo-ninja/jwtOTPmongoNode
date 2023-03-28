const express = require ("express");
const router = express.Router();

const userRoutes =  require("./../domains/user");
const OTPRoutes = require("./../domains/otp");
// const { verifyOTP } = require("../domains/otp/controller");
const EmailVerificationRoutes=require("./../domains/email_verification");
const ForgotPasswordRoutes = require("./../domains/forgot_password");

//call mqtt
const MqttRoutes = require("./../domains/mqtt");


router.use("/user",userRoutes);
router.use("/otp",OTPRoutes);
router.use("/email_verification",EmailVerificationRoutes);
router.use("/forgot_password",ForgotPasswordRoutes);

//use mqtt
router.use("/mqtt",MqttRoutes);

module.exports = router;