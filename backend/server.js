const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handiling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception `);
  process.exit(1); 
});

// config
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();


let server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


// Unhandled promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`); // logs the error in our server
  console.log(`Shutting down the server due to unhandled Promise Rejection `);

  server.close(() => {
    process.exit(1);
  });
});


// let randNo = Math.floor(Math.random() * 10);
// console.log(randNo);
