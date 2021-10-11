const express = require('express')
const router= express.Router()

const filterController = require('../Controllers/FilterController')





router.get('/', filterController.getNewArriavls)
router.post('/search', filterController.searchByQuery)


module.exports = router;