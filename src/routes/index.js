const homeRouter = require('./home')
const userRouter = require('./user')
const sessionChecker = require('../middlewares/sessionChecker')


function router(app){
    app.use('/user', userRouter)
    app.use('/', sessionChecker,  homeRouter)
}

module.exports = router
