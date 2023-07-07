const axios = require('axios');

async function searchPayment(headers, baseUrl, trxID, operation) {
    const url =  `${baseUrl}tokenized/checkout/general/searchTransaction`

    try {
        const data = {
            trxID
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in searchPayment');
    }
}



module.exports = {
    searchPayment
}