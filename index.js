const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000



app.use('/', (req, res, next) => {
    res.json({ 
        name: "hello"
    })
})


app.listen(PORT, ()=>console.log(`App listening post ${PORT}`))