const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

//mongoose.connect(URI);
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Found error: " + error);
    process.exit(0);
  }
};

module.exports = connectDb;
