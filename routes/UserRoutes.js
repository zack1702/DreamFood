
const express = require('express')
const router = express.Router();
const userController = require('../Controllers/UserController')
const { authenticateJWT } = require('../middleware/Authenticator')
router.get("/:userId",authenticateJWT,userController.getUser)
router.get("/friends/:userId",authenticateJWT,userController.followingsList)
router.put("/:userId/follow",authenticateJWT,userController.followUser)
router.put("/:userId/unfollow",authenticateJWT,userController.unfollowUser)

module.exports = router;