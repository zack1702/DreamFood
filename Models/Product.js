const mongoose =require('mongoose')


const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price:{
        type:Number,
        required: true
    },
    
     product_category: {
        type:String,
        required:true
        
        
 },
    product_quantity:{
        type:Number,
        required:true
    }
}, { timestamps: true }
)
ProductSchema.index({product_name:'text'})
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;