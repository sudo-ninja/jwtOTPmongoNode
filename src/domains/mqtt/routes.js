const express = require ("express");
const router = express.Router();

const {mqttConnection} = require("./controller")

router.post("/",async(req,res)=>{
    try {
        let{topic,message}=req.body;
        const MqttConnection = await mqttConnection({
            topic,message});
            res.status(200).json(MqttConnection);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports=router;