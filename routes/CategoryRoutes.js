const express = require('express')
const router= express.Router()

const categoryController = require('../Controllers/CategoryController')
const { authenticateJWT } = require('../middleware/Authenticator')


router.get('/', categoryController.readAll)
router.post('/',  categoryController.create)


module.exports = router;