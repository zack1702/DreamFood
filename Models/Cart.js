const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    total: {
      type: Number,
      default: 0
    },
    cartItems:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        },
        subTotal:{
            type:Number,
            default:0
        }
    }],
   
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);