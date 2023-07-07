const axios = require('axios');

async function createPayment(headers, baseUrl, agreementID, payerReference, callbackURL, amount, merchantInvoiceNumber) {
    const url = `${baseUrl}tokenized/checkout/create`;

    try {
        const data = {
            mode: '0001',
            payerReference,
            callbackURL,
            agreementID,
            amount,
            merchantInvoiceNumber,
            currency: 'BDT',
            intent: 'sale'
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in Create Payment');
    }
}


async function executePayment(headers, baseUrl, paymentID, operation) {
    let url;

    if (operation === 'execute') {
        url = `${baseUrl}tokenized/checkout/execute`;
    }
    else {
        url = `${baseUrl}tokenized/checkout/payment/status`;
    }

    try {
        const data = {
            paymentID
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in executePayment');
    }
}

module.exports = {
    createPayment,
    executePayment
}