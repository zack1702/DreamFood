const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    quantity: Number,
    price: {
      type: Number,
      default: 0
    },
   
    status: {
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);