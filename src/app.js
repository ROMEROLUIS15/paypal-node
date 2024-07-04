const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/pay', router);

app.get('/', (req, res) => {
    return res.send("<h1> Pay with Paypal </h1>");
})

module.exports = app