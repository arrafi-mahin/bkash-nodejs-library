const axios = require('axios');
const { grantToken } = require('./Token');

async function getHeadersForAgreement(ceredentials) {
    const { appKey } = ceredentials
    const tokenResponse = await grantToken(ceredentials);
    const id_token = tokenResponse.id_token;

    return {
        'Authorization': id_token,
        'X-App-Key': appKey,
    };
}


async function createAgreement(ceredentials) {
    const { username, password, appKey, appSecret, baseUrl } = ceredentials
    const url = `${baseUrl}tokenized/checkout/create`;
    try {
        const headers = await getHeadersForAgreement(ceredentials);

        const data = {
            'mode': '0000',
            'payerReference': '01970851626',
            'callbackURL': 'https://rafi.netlify.app',
            'amount': '0.01',
            'currency': 'BDT',
            'intent': 'sale'

        };
        const response = await axios.post(url, data, { headers });
        return response.data

    } catch (error) {
        console.log(error);
    }
}


async function executeAgreement(ceredentials) {
    const { username, password, appKey, appSecret, baseUrl } = ceredentials
    const url = `${baseUrl}tokenized/checkout/execute`;
    try {
        const res = await createAgreement(ceredentials);
        const paymentID = res.paymentID;
        const headers = await getHeadersForAgreement(ceredentials)
        const data = {
            paymentID
        };

        const response = await axios.post(url, data, { headers });
        return response.data

    } catch (error) {
        console.log(error);
    }
}

async function queryAgreement(ceredentials) {
    const { baseUrl } = ceredentials
    const url = `${baseUrl}tokenized/checkout/execute`;
    try {
        const res = await executeAgreement(ceredentials);
        const agreementID = res.agreementID;
        const headers = await getHeadersForAgreement(ceredentials)
        const data = {
            agreementID
        };

        const response = await axios.post(url, data, { headers });
        return response.data

    } catch (error) {
        console.log(error);
    }
}





module.exports = {
    createAgreement, executeAgreement, queryAgreement
};
