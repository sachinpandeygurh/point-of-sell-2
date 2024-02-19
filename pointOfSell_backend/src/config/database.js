const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})
const connectDatabase = () => {
  const dbURI = process.env.DB_URI 
  || "mongodb+srv://sachin:sachin@cluster0.fzs7pmg.mongodb.net/?retryWrites=true&w=majority"

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((data) => {
    console.log(`MongoDB connected to server: ${data.connection.host}`);
  }).catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
};

module.exports = connectDatabase;
