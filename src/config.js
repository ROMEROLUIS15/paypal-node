require('dotenv').config()

const PORT = 3000
const HOST = 'http://localhost' + PORT

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY
const PAYPAL_API = 'https://api-m.sandbox.paypal.com' // IN DEVELOPMENT
//const PAYPAL_API = 'https://api-m.paypal.com' IN PRODUCTION


module.exports = {
    PORT,
    HOST,
    PAYPAL_CLIENT_ID,
    PAYPAL_SECRET_KEY,
    PAYPAL_API
}