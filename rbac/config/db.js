const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = () => {
  const mongourl = process.env.DB_URL;
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(mongourl, mongoOptions);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports= connectDB

