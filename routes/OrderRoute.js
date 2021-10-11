const express = require('express')
const router= express.Router()

const ordreController = require('../Controllers/ordreController')
const { authenticateJWT } = require('../middleware/Authenticator')


router.post('/',authenticateJWT ,ordreController.createOrdre)
router.get("/:userId",authenticateJWT , ordreController.getMyOrdre)
router.delete("/:id",authenticateJWT , ordreController.deleteOrdre)

router.put('/:id',authenticateJWT, ordreController.editOrdre)
module.exports = router;