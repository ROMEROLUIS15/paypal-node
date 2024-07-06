const { HOST, PAYPAL_API, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = require('../config.js')
const axios = require('axios')

const createOrder = async(req, res) => {
    try {
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

    // format the body
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    // Generate an access token
    const { data: {access_token} } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY
        }
    })
    console.log(access_token)

    // make a request
    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
     headers: {
         //'Content-Type': 'application/json',
         Authorization: `Bearer ${access_token}`
         }
    })
    console.log(response.data)

    return res.json(response.data)
} catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
}


const captureOrder = async(req, res) => {
    try {
    const { token } = req.query

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {} , {
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET_KEY
        }
    })

    console.log(response.data)

    res.redirect("/payed.html")
} catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
}


const cancelPayment = async(req, res) => {
    return res.redirect("/")
}

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment
}