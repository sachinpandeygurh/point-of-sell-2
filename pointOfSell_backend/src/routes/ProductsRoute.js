const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 
const {getAllProducts , createProduct} = require('../controllers/productController')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/admin/product/new').post(createProduct)

module.exports= router