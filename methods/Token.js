const axios = require('axios')
async function grantToken(credentials) {
    const { username, password, appKey, appSecret, baseUrl } = credentials;
    const url = `${baseUrl}tokenized/checkout/token/grant`;

    const headers = {
        username,
        password
    };
    const data = {
        'app_key': appKey,
        'app_secret': appSecret,
    };

    try {
        const response = await axios.post(url, data, { headers });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Error in grantToken request');
    }
}


async function refreshToken(ceredentials) {
    const { username, password, appKey, appSecret, baseUrl } = ceredentials
    const url = `${baseUrl}tokenized/checkout/token/refresh`;
    try {
        const tokenResponse = await grantToken(ceredentials);
        const refreshToken = tokenResponse.refresh_token;

        const headers = {
            username,
            password
        };

        const data = {
            'app_key': appKey,
            'app_secret': appSecret,
            'refresh_token': refreshToken
        };

        const response = await axios.post(url, data, { headers });
        // console.log("refresh",response.data);
        return response.data

    } catch (error) {
        // console.log(error);
    }
}

module.exports = {
    grantToken, refreshToken
};
