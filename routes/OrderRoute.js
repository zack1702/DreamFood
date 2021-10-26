const express = require('express')
const router= express.Router()

const orderController = require('../Controllers/orderController')
const { authenticateJWT } = require('../middleware/Authenticator')


router.post('/:userId',authenticateJWT ,orderController.createOrder)
router.get("/:userId" , authenticateJWT,orderController.getMyOrder)
router.delete("/:userId/:id",authenticateJWT , orderController.deleteOrder)

router.put('/:userId/:id',authenticateJWT, orderController.editOrder)
module.exports = router;