// mongo db setup
require("./config/db");

// express package
const express =  require("express");
const bodyParser = express.json;
const cors = require("cors");

const routes = require("./routes");


// create server app
const app = express();
// initialize server app

app.use(cors());
app.use(bodyParser());
app.use("/api/v1",routes);

//for new user signup use below string in postman
// post : localhost:5000/api/v1/user/signup

//for login use below string in postman
//post : localhost:5000/api/v1/user/

//to get data using private_data
//get:localhost:5000/api/v1/user/private_data?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA4NTc1MDQ3NjZjOTNiMDY2MGZmZjciLCJlbWFpbCI6Im1hbm9qNTZAZ21haWwuY29tIiwiaWF0IjoxNjc4MjY4OTY5LCJleHAiOjE3MDk4MDQ5Njl9.kCQPsTZuZ9148qzkzCNq6NF2j8j9Q6Hsk2MTMpXM3Yk

//to get OTP verification mail 
// localhost:5000/api/v1/otp/
// pass below data in body 
// {
//     "email":"jenix@gmail.com", this is receiver mail 
//     "subject":"Email Verification",
//     "message":"verify your email with below code",
//     "duration": 1
// }
// 
//expose this module to main index.js in src file

//** to verify OTP in post man  */
// POST : localhost:5000/api/v1/otp/verify 
/* {
    "email": "jenixjain@gmail.com",
    "otp":"780957"
}*/

/*POST localhost:5000/api/v1/email_verification/ 
for email verification with OTP 
{
    "email":"manoj020218@gmail.com"
}

*/

/*POST localhost:5000/api/v1/email_verification/verify
https://www.youtube.com/watch?v=TFWuG4qTqIE
after entering OTP to check if email is confirmed
{
    "email":"manoj020218@gmail.com",
    "otp":"716761"
}
*/

module.exports = app;