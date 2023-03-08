const User = require ("./model");
const {hashData} = require("./../../util/hashData");

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

module.exports = {createNewUser}