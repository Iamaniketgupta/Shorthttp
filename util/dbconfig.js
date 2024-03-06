const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/shorturl";

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = dbConnect;
