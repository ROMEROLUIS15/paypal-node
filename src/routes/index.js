const express = require('express')
const paymentRouter = require('./payment.router')
const router = express.Router()

router.use(paymentRouter)

module.exports = router