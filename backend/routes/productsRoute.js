const express = require('express')
const app=express();
const bodyParser=require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const { getAllProducts , createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview} = require('../controller/productController');
const { isAuthenticateduser, authorizeRoles } = require('../middleware/auth');
const router = express.Router()


router.route('/products').get( getAllProducts)
router.route('/admin/product/new').post(isAuthenticateduser, authorizeRoles("admin"), createProduct)
router.route('/admin/product/:id').put(isAuthenticateduser, authorizeRoles('admin'), updateProduct).delete(isAuthenticateduser, authorizeRoles('admin'), deleteProduct)
router.route('/product/:id').get(getProductDetails)
router.route("/review").put(isAuthenticateduser, createProductReview)
module.exports=router