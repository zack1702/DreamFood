
const express = require('express')
const router = express.Router();
const userController = require('../Controllers/UserController')

router.get("/:userId",userController.getUser)
router.get("/friends/:userId",userController.followingsList)
router.put("/:userId/follow",userController.followUser)
router.put("/:userId/unfollow",userController.unfollowUser)

module.exports = router;