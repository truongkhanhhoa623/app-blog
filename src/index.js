const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const router = require('./routes')
const handlebars = require('express-handlebars')
const path = require('path')
const database = require('./config/db')

//connect to database mongodb
database.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.engine('hbs', handlebars({
    defaultLayout: 'main',
    extname: "hbs"
}))
//Config all router 
router(app)

app.listen(PORT, ()=>console.log(`App listening post ${PORT}`))