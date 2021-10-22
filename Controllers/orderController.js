const Order = require('../Models/Order')
const Cart = require('../Models/Cart')

exports.createOrder = async (req, res) => {
  try {
    const cart = req.body.cartId;
    const total = req.body.total;
    const user = req.body.userId;

    const order = new Order({
      cart,
      user,
      total
    });

    const orderDoc = await order.save();
     const cartDoc = await Cart.findById(orderDoc.cart._id)

    const newOrder = {
      _id: orderDoc._id,
      user: orderDoc.user,
      total: orderDoc.total,
      products: cartDoc.products
    };
    res.status(200).json({
      success: true,
      message: `Your order has been placed successfully!`,
      order: newOrder
    })} catch (error) {
      res.status(400).json({
        error: 'Your request could not be processed. Please try again.'
      });
  }
}

exports.getMyOrder = async (req, res) => {
    
    try {
      const Orders = await Order.findOne({userId:req.params.userId})
        res.json({Orders})
    } catch (err) {
        console.log('Order get  error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.deleteOrder = async (req, res) => {
   
    try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    res.json(deletedOrder)
    } catch (err) {
        console.log('Order delete error: ', err)
        res.status(500).json({
            errorMessage: 'Please ', 
        })
    }
}


exports.editOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedOrder);
      } catch (err) {
        res.status(500).json(err);
      }
    }