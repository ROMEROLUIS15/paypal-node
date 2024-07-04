const express = require('express')
const {  createOrder, captureOrder, cancelPayment } = require('../controller/payment.controller.js')
const paymentRouter = express.Router()

paymentRouter.route('/create-order')
.get(createOrder)

paymentRouter.route('/capture-order')
.get(captureOrder)

paymentRouter.route('/cancel-payment')
.get(cancelPayment)

module.exports = paymentRouter