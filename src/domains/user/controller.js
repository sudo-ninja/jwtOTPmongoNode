const User = require ("./model");
const {hashData,verifyHashedData} = require("./../../util/hashData");
const createToken = require("./../../util/createToken");

// to authenticate user info at time of login
const authenticateUser = async(data)=>{
    try {
        const {email,password}=data;
        // based on email search find user from DB
        // here fetched user can be done based on mobile number 
        //so fetched user either using mobile or email will be same
        const fetchedUser = await User.findOne({
            email
        });
        
        if(!fetchedUser){
            throw Error("invalid user credentials");
        }

        //email verified user
        if(!fetchedUser.verified){
            throw Error("Email Has not verified yet . Check Your inbox");
        }
        //hash the password input of user provided
        const hashedPassword = fetchedUser.password;
        // verify hashed password used hashed data verification
        const passwordMatch = await verifyHashedData(password,hashedPassword);

        if(!passwordMatch){
            throw Error("Invalid password entered");
        }
        // if password matched then Create User Token 
        const tokenData = {userId: fetchedUser._id,email};
        const token = await createToken(tokenData);

        //assign user token
        fetchedUser.token = token;
        // return logged in user data with token 
        return fetchedUser; 
    } catch (error) {
        throw error;
    }
};

// at time of sign up to create new user
const createNewUser = async (data) =>{
    try {
        const {name,email,password}= data;

        //check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            throw Error ("User with the provided email already exists");
        }
        //hash password 
        const hashedPassword = await hashData(password);
        //saved hashed password information in DB used User model 
        const newUser = new User ({
            name,
            email,
            password:hashedPassword,
        });

        //save user 
        const createdUser = await newUser.save();
        return createdUser;

    } catch (error) { 
        throw error;        
    }
};

module.exports = {createNewUser,authenticateUser}