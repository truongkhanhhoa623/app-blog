const router = require('express').Router()
const userController = require('../app/controllers/UserController')

router.get('/logout', userController.logout)
router.get('/', userController.userHome)

module.exports = router