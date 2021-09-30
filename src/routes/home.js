const router = require('express').Router()
const homeController = require('../app/controllers/HomeController')

router.get('/', homeController.home)

module.exports = router