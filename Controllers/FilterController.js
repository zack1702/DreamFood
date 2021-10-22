const Product = require('../Models/Product')


exports.getNewArriavls = async (req, res) => {
    const sortBy= req.query.sortBy ? req.query.sortBy : 'desc'
    const limit= req.query.limit ? parseInt(req.query.limit) :parseInt(6) 
    try {
        const newArrivals = await Product.find({}).sort({createdAt:sortBy}).limit(limit)
        res.json({newArrivals})
    } catch (err) {
        console.log('getNewARRiavls filter error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

exports.searchByQuery = async (req, res) => {
   const {type,query}=req.body;

    try {
        let products;
        switch(type){
            case 'text':
                products= await Product.find({$text : {$search: query}})
        break;
        case 'category':
            products= await Product.find({product_category : query})
    break;
    }if(!products?.length >0){
        products = await Product.find({})
    }
    res.json({products})
        
    } catch (err) {
        console.log('searchByQuery filter error: ', err)
        res.status(500).json({
            errorMessage: 'Please try again later',
        })
    }
}

