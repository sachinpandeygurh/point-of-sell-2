const Order = require('../model/orderModel'); 
const Product = require('../model/prodectModel'); 
const ErrorHandler = require('../utils/errorhander'); 
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// Create a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });
  
    res.status(201).json({
      success: true,
      order,
    });
  });

  

  // get single Order
exports.getSingleOrder = catchAsyncErrors(async (req , res, next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )
    if(!order){
        return next(new ErrorHandler("No order found with this id"),404)
    }
    res.status(200).json({
        success :true,
        order
    })
})

  // get logged in user Order
exports.myOrder = catchAsyncErrors(async (req , res, next)=>{
    const orders = await Order.find({user: req.user._id})
   
    res.status(200).json({
        success :true,
        orders
    })
})

// get all Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});


// update Order status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      orderStatus: order.orderStatus,
    
    });
  });
  
async function updateStock (id , quantity) {
    const product = await Product.findById(id)

    product.stock -=quantity;
    await product.save();

}


// delete order - Admin
exports.deleteOrder = catchAsyncErrors(async (req,res,next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler('order not found with this Id', 404))
    }
    await order.deleteOne()

    res.status(200).json({
        success :true
    })
})