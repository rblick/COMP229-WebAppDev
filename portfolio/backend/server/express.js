/* 
COMP229_F2026
Lab Assignment 2
Robert Blick 300808673
*/

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const createError = require("http-errors");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const referenceRoutes = require("./routes/referenceRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/references", referenceRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message
    });
});

module.exports = app;

