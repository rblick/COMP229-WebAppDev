const serverless = require("serverless-http");
const app = require("../../server/express");
const connectDB = require("../../config/db");

const handler = serverless(app);

exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await connectDB();
        return await handler(event, context);
    } catch (err) {
        console.error("Database connection failed:", err.message);

        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                message: "Database connection failed."
            })
        };
    }
};