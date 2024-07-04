const { HOST, PAYPAL_API } = require('../config.js')
const { axios } = require('axios')

const createOrder = async(req, res) => {
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "100.00",
                }
            }
        ],
        application_context: {
            brand_name: "My store",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/capture-order`,
            cancel_url: `${HOST}/cancel-payment`,
        }
    }
   axios.post(`${PAYPAL_API}/v2/checkout/orders`)
}


const captureOrder = async(req, res) => {
    return res.send('capture Order')
}


const cancelPayment = async(req, res) => {
    return res.send('cancel Payment')
}

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment
}