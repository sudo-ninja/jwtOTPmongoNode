const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MqttSchema = new Schema({
    topic: String,
    // mobile: {type:String, unique:true},
    // email:{type:String, unique:true},
    message:String,
    // switch_id: {type:String, unique:true},   
});

const Mqtt = mongoose.model("Mqtt",MqttSchema);

module.exports = Mqtt;