const mongoose = require("mongoose");

exports.connectDB = async() => {
    try {
        mongoose.connect("mongodb://0.0.0.0/taskmanagement");
        console.log("Successfully connected to database");
    } catch (error) {
        console.log(error, "error");
        process.exit(1);
    }
}