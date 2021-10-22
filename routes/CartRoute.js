const express = require('express')
const router= express.Router()

const cartController = require('../Controllers/cartController')
const { authenticateJWT } = require('../middleware/Authenticator')


router.post('/:userId',authenticateJWT ,cartController.createCart)
router.get("/:userId",authenticateJWT , cartController.getMyCart)
router.delete("/:id",authenticateJWT , cartController.deleteCart)

router.put('/:id',authenticateJWT, cartController.editCart)
module.exports = router;