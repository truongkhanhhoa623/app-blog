const router = require('express').Router()
const homeController = require('../app/controllers/HomeController')


router.get('/home/login', homeController.login)
router.post('/home/auth', homeController.auth)
router.get('/home/signup', homeController.signup)
router.post('/home/register', homeController.register)
router.get('/', homeController.home)

module.exports = router