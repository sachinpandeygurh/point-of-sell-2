const Product = require("../models/productModel")
const ErrorHandler = require("../util/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../util/apiFeatures")


exports.createProduct = catchAsyncErrors(async  (req , res, next)=>{
    // req.body.user = req.user.id;
    console.log("prodct");
    let prodct  = req.body
    if (!prodct) {
        return next(new ErrorHandler("product data not found", 404))
        
    }
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product,
    })
})

exports.getAllProducts = catchAsyncErrors(async (req, res , next)=>{
    const resultperpage = 8

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()

    const productCount = await Product.countDocuments()

    apiFeature.pagination(resultperpage)
    const product = await apiFeature.query

    const filterProductCount = product.length

    res.status(200).json({
        success:true,
        product,
        productCount,
        resultperpage,
        filterProductCount
    })
})

