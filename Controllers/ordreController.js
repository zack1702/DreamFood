const Order = require('../Models/Order')

exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
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