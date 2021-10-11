const fs = require('fs') //fillesysteme

const Product = require('../Models/Product')



exports.create = async (req, res) => {
    console.log(req.file)
     const {filename}=req.file;//filename of image in req.file d'apres multer
    const { product_name,product_description,product_category,product_price,product_quantity } = req.body;
    
    try {
        let newproduct = new Product()
        newproduct.fileName = filename
        newproduct.product_name = product_name
        newproduct.product_description = product_description
        newproduct.product_price = product_price
        newproduct.product_quantity = product_quantity
        newproduct.product_category = product_category
         const product =await newproduct.save()
        res.status(200).json({
            successMessage: `${newproduct.product_name} was created`,
            product,
        })
    } catch (err) {
        console.log('product create error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.readAll = async (req, res) => {
    console.log(req.file)
    try {
      const products = await Product.find({}).limit(6)
        res.json({products})
    } catch (err) {
        console.log('product create error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}
exports.getProductsByCount = async (req, res) => {
    
    try {
      const products = await Product.find({})
        res.json({products})
    } catch (err) {
        console.log('product create error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}
exports.deleteProduct = async (req, res) => {
   
    try {
     const productId= req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId)
    fs.unlink(`uploads/${deletedProduct.fileName}`,(err)=>{
        if(err) throw err;
    })
    res.json(deletedProduct)
    } catch (err) {
        console.log('product delete error: ', err)
        res.status(500).json({
            errorMessage: 'Please ', 
        })
    }
}

exports.getProduct = async (req, res) => {
    
    try {
        const productId = req.params.productId
        const product = await Product.findById(productId)
        res.json(product)
    } catch (err) {
        console.log('getProduct error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}
exports.editProduct = async (req, res) => {
    req.body.fileName= req.file.filename;//filename of image in req.file d'apres multer
   
    const productId = req.params.productId;
    const oldProduct = await Product.findByIdAndUpdate(productId,req.body)
    fs.unlink(`uploads/${oldProduct.fileName}`,(err)=>{
        if(err) throw err;})
        res.json({
            successMessage: 'Product successfully updated',
        });
}