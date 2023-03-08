// mongo db setup
require("./config/db");

// express package
const express =  require("express");
const bodyParser = express.json;
const cors = require("cors");

const routes = require("./routes");


// create server app
const app = express();
// initiaise server app
app.use(cors());
app.use(bodyParser());

app.use("/api/v1",routes);

//expose this module to main index.js in src file
module.exports = app;