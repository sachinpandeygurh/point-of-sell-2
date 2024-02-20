const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI || "mongodb://127.0.0.1:27017/ecommwebsite" ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // createIndexes: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    
};

module.exports = connectDatabase;
