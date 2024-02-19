const app = require ("./app")
const dotenv = require("dotenv")
const connectDatabase = require("./config/database");
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// process.on("uncaughtException", (error)=>{
//     console.log(`uncaught Exception: ${error.message}`)
//     console.log(` shutting down the server due to uncaught exception`)
//     process.exit(1)
// })

dotenv.config({path: "./config/config.env"})

connectDatabase()
const port = process.env.PORT || 3000; 

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
