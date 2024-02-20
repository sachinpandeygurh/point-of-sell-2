const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    default: 0,
    required: [true, "Please enter the product price"],
    maxlength: [4, "Price can't exceed 8 characters"],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 1,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the product category"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the product stock"],
    max: [9999, "Stock can't exceed 4 characters"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Product must belong to a User"],
    },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        maxlength: [
          280,
          "Comment should be less than or equal to 280 characters",
        ],
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Product must belong to a User"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model("Product", productSchema);
const Product = mongoose.model("Product", productSchema); 

module.exports = Product;
