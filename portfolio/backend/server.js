/* 
COMP229_F2026
Lab Assignment 2
Robert Blick 300808673
*/

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 3000;
const createError = require("http-errors");
const connectDB = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);

app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

connectDB().then(() => {
    app.listen(port, () => {
    console.log("Server and DB are running");
    });
});


