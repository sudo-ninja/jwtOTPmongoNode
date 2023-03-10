const app = require ("./app");
require("dotenv");

const {PORT} = process.env || 8080;


// set port, listen for requests
const startApp = () =>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}

startApp();