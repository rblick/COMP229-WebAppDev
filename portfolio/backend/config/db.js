const mongoose = require("mongoose");

let connectionPromise;

async function connectDB() {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                connectionPromise = null;
                throw err;
            });
    }

    return connectionPromise;
}

module.exports = connectDB;