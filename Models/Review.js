const mongoose = require("mongoose");


const ReviewSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: null
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    title: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      default: 0
    },
    review: {
      type: String,
      trim: true
    },
    isRecommended: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: 'Waiting Approval',
      enum: ['Waiting Approval', 'Rejected', 'Approved']
    },
    
  });
  
  module.exports = mongoose.model('Review', ReviewSchema);