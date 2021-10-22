const express = require('express')
const router= express.Router()

const orderController = require('../Controllers/orderController')
const { authenticateJWT } = require('../middleware/Authenticator')


router.post('/addOrder' ,orderController.createOrder)
router.get("/:userId" , orderController.getMyOrder)
router.delete("/:id",authenticateJWT , orderController.deleteOrder)

router.put('/:id',authenticateJWT, orderController.editOrder)
module.exports = router;