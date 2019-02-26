
// eslint-disable-next-line no-console

const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors()) //allow anyone to access server

app.post('/register', (req, res) => {
    res.send({
        message: `Welcome ${req.body.email} user was registered!`
    })
})


app.listen(process.env.PORT || 8081)