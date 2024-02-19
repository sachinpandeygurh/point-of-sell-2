const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const ErrorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(ErrorMiddleware)

app.use(express.json())

app.use(cookieParser())

const product = require("./routes/ProductsRoute") 

app.use("/api/v1" , product)
app.use("/", (req, res) => {
    res.send("API working");
  });

module.exports = app