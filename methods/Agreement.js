const axios = require('axios');

// async function getHeadersForAgreement(ceredentials) {
//     const { appKey } = ceredentials
//     const tokenResponse = await grantToken(ceredentials);
//     const id_token = tokenResponse.id_token;

//     return {
//         'Authorization': id_token,
//         'X-App-Key': appKey,
//     };
// }


async function createAgreement(payerReference, callbackURL, amount, headers, baseUrl) {
    const url = `${baseUrl}tokenized/checkout/create`;

    try {
        // const headers = this.getHeaders(false);
        const data = {
            mode: '0000',
            payerReference,
            callbackURL,
            amount,
            currency: 'BDT',
            intent: 'sale'
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in createAgreement');
    }
}


async function executeAgreement(headers, baseUrl, paymentID) {
    const url = `${baseUrl}tokenized/checkout/execute`;

    try {
        // const headers = this.getHeaders(false);
        const data = {
            paymentID
        };

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in executeAgreement');
    }
}

//naming wrong
async function queryAgreement(headers, baseUrl, agreementID, operation) {
    let url;
    if (operation === 'query') {
        url = `${baseUrl}tokenized/checkout/agreement/status`;
    }
    else {
        url = `${baseUrl}tokenized/checkout/agreement/cancel`;
    }

    try {
        // const headers = this.getHeaders(false);
        const data = {
            agreementID
        };

        // axios call method  for axios reuse

        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error('Error in queryAgreement');
    }
}



module.exports = {
    createAgreement, executeAgreement, queryAgreement
};
