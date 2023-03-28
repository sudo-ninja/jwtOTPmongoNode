const Mqtt = require ("./model");
const mqtt  = require('mqtt');
            const {MQTT_URI} = process.env;
            var client = mqtt.connect(MQTT_URI,{
            clientId,
            clean:true,
            connectionTimeout: 4000,
            username: 'AnalyserNode',
            password: 'public',
            reconnectPeriod:1000,
            });
        
      
            var topic = 'test' ;
            var message = 'from Server';

            var clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
           
                client.on('connect',()=>{
                    try {
                        console.log("MQTT connected");
                    } catch (error) {
                        console.log(error);
                    }
                });

                client.on('connect',()=>{
            
                    try{
                    if(client.connected === true){  // this if condition check if MQTT connected then only perform 
                        console.log(`message: ${message},topic: ${topic}`);
                        // publish message 
                        client.publish(topic,message,{qos:0,retain:false},(error)=>{
                            if(error) console.error(error);
                        });  // this will publish to MQTT
                        // client.publish(topic,message);  // this will publish to MQTT
    
                        //subscribe to topic
                        client.subscribe(topic);  // here it will subscribe to topic ( as fixed above) 
                        client.on('message',(topic,message)=>{
                            console.log(`message: ${message}, topic: ${topic}`);
                        });

                        }  
                        
                        }catch (error) {
                            console.log(error);
                        }

                });


const mqttConnection = async (req,res)=>{
try {
    const{topic,message}=req; 
    client.publish(topic,message,{qos:0,retain:false},(error)=>{
        if(error) console.error(error);
    }); 
            //subscribe to topic
            client.subscribe(topic);  // here it will subscribe to topic ( as fixed above) 
            client.on('message',(topic,message)=>{
                console.log(`message: ${message}, topic: ${topic}`);
            });

} catch (error) {
    throw error;
}
    

}

module.exports = {mqttConnection}
