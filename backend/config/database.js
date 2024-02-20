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

// mongodb+srv://sachinpandey12031999:123@cluster0.e4qlyop.mongodb.net/
// http://localhost:4000/api/v1/product/new