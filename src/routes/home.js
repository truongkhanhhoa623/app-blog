const router = require('express').Router()
const homeController = require('../app/controllers/HomeController')
const realemail = require('../middlewares/realemail')

router.get('/home/login', homeController.login)
router.post('/home/auth', homeController.auth)
router.get('/home/signup', homeController.signup)
router.post('/home/register', realemail, homeController.register)
router.get('/', homeController.home)

module.exports = router