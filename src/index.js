const express = require('express') 
const app = express()
const PORT = process.env.PORT || 4000
const router = require('./routes')
const handlebars = require('express-handlebars')
const path = require('path')
const database = require('./config/db')
const cookieParser = require('cookie-parser')
const session = require("express-session")
const cookieCheck = require('./middlewares/cookieChecker')
// const doseModifyBody = require('./middlewares/doseModifyBody')
//connect to database mongodb
database.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

//init cookieParser
app.use(cookieParser()) 
// init session
app.use(
    session({
      key: "user_sid",
      secret: "somerandonstuffs",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000,
      },
    })
  );

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: "hbs"
}))

// app.use(doseModifyBody)
app.use(cookieCheck)
//Config all router 
router(app)

app.listen(PORT, ()=>console.log(`App listening post ${PORT}`))