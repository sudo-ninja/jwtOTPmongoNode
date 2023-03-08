const express = require ("express");
const router = express.Router();
const {createNewUser,authenticateUser} = require("./controller")
const auth = require("./../../middleware/auth");


//protected route
router.get("/private_data", auth, (req,res)=>{
    res.status(200).send(`You are in private territory of ${req.currentUser.email}`);
})

//Sign in
router.post("/",async(req,res)=>{
    try {
        let {email,password} = req.body;
        email=email.trim();
        password=password.trim();  

        //check condition
        if(!(email&&password)){
            throw Error("Empty credentials!");
        }
        //authentication checked
        const authenticatedUser = await authenticateUser({
            email,password });
        res.status(200).json(authenticatedUser);

    } catch (error) {
        res.status(400).send(error.message);
        
    }
});

// signup
router.post("/signup",async(req,res)=>{
    try {
        let {name,email,password}= req.body;
        name=name.trim();
        email=email.trim();
        password=password.trim();   

        if(!(name && email && password)){
            throw Error("Empty input fields!");
        }else if (!/^[a-zA-Z]*$/.test(name)){
            throw Error("Invalid Username Entered!");
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw Error("Invalid email Entered!");
        } else if (password.length<8){
            throw Error("Password must be 8 digit or more!");
        } else {
            //good credentials create new user now 
            const newUser = await createNewUser({
                name,
                email,
                password,
            });
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(400).send(error.message);         
    }   
});

module.exports=router;
