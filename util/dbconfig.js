const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URI;

const dbConnect = async () => {
    try {
        await mongoose.connect(`${DB_URL}/shorthttp`)
        
    } catch (err) { 
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = dbConnect;
