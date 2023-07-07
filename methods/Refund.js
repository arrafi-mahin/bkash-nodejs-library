const axios = require('axios');

async function refundPayment(headers, baseUrl, paymentID, amount, trxID, sku, reason) {
    const url = `${baseUrl}tokenized/checkout/payment/refund`

    try {
        const data = {
            paymentID, amount, trxID, sku, reason
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in searchPayment');
    }
}
async function checkRefund(headers, baseUrl, paymentID, trxID) {
    const url = `${baseUrl}tokenized/checkout/payment/refund`

    try {
        const data = {
            paymentID, trxID
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in searchPayment');
    }
}

module.exports = {
    refundPayment, checkRefund
}