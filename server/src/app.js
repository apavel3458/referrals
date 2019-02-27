/* eslint-disable no-console */

// eslint-disable-next-line no-console

const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require ('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors()) //allow anyone to access server

require('./routes')(app)

app.post('/register', (req, res) => {
    res.send({
        message: `Welcome ${req.body.email} user was registered!`
    })
})

sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    })
