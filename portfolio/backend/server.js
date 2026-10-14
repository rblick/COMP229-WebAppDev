/* 
COMP229_F2026
Lab Assignment 2
Robert Blick 300808673
*/

require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log("Server and DB are running");
    });
});