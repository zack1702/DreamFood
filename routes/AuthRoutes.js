const express = require('express')
const router = express.Router();
const upload = require('../middleware/Multer')
const { signupValidator, validatorResult, signinValidator,  } = require('../middleware/Validator');
const { signupController, signinController } = require('../Controllers/AuthController');
router.post('/signup', signupValidator, validatorResult,upload.single('profilPic'), signupController);
router.post('/signin', signinValidator, validatorResult, signinController);
module.exports = router;