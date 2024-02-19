const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"],
        trim: true // yadi nam ke pahale space raha to hata dega 
    },
    description: {
        type: String,
        required: [true, "please enter product description"]
    },
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    price: {
        type: Number,
        required: [true, "please enter product price"]
    },
    quantity: {
        type: Number,
        default: 1
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:1
    },
    images:[
        {
            public_id:{
                type:String,
                require:true
            },
            url:{
                type:String,
                require:true
            }
        }
    ],
    stock:{
        type:Number,
        require:[true , "Please enter product stock"],
        max:[9999, "Stock can't exced 4 characters"],
        default:1
    },
    numberOfReviews:{
        type: Number,
        default:0
    },
    rewiews:[
        {
            user:{
                // TODO next day start in here 
            }
        }
    ]

})

const Product = mongoose.model("product", productSchema);
module.exports = Product
