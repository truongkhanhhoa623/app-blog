const router = require('express').Router()
const userController = require('../app/controllers/UserController')

router.get('/post/create', userController.create)
router.post('/post/store', userController.store)
router.get('/logout', userController.logout)
router.get('/', userController.userHome)

module.exports = router