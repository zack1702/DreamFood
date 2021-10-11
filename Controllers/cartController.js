const fs = require('fs') //fillesysteme

const Cart = require('../Models/Cart')



exports.createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
}

exports.getMyCart = async (req, res) => {
    
    try {
      const carts = await Cart.findOne({userId:req.params.userId})
        res.json({carts})
    } catch (err) {
        console.log('cart get  error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.deleteCart = async (req, res) => {
   
    try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id)
    res.json(deletedCart)
    } catch (err) {
        console.log('cart delete error: ', err)
        res.status(500).json({
            errorMessage: 'Please ', 
        })
    }
}


exports.editCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(500).json(err);
      }
    }