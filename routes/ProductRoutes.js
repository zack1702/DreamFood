const express = require('express')
const router= express.Router()

const productController = require('../Controllers/ProductController')
const { authenticateJWT } = require('../middleware/Authenticator')
const upload = require('../middleware/Multer')



router.get('/', productController.readAll)
router.get('/count', productController.getProductsByCount)
router.get('/:productId', productController.getProduct)
router.delete('/:productId', productController.deleteProduct)
//product_image=name input client
router.put('/:productId', authenticateJWT,upload.single('product_image'),productController.editProduct)
router.post('/', authenticateJWT, upload.single('product_image'), productController.create)


module.exports = router;