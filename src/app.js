// mongo db setup
require("./config/db");

// express package
const express =  require("express");
const bodyParser = express.json;
const cors = require("cors");

const routes = require("./routes");


// create server app
const app = express();
// initialise server app

app.use(cors());
app.use(bodyParser());

app.use("/api/v1",routes);

//for new user signup use below string in postman
// post : localhost:5000/api/v1/user/signup

//for login use below string in postman
//post : localhost:5000/api/v1/user/

//expose this module to main index.js in src file
module.exports = app;