const axios = require('axios');

function grantToken(headers, appKey, appSecret, baseUrl) {
    const url = `${baseUrl}/tokenized/checkout/token/grant`;
    

    const data = {
        'app_key': appKey,
        'app_secret': appSecret,
    };

    return axios.post(url, data, { headers })
        .then(response => response.data)
        .catch(error => {
            throw new Error('Error in grantToken request');
        });
}

function refreshAccessToken(headers, appKey, appSecret, baseUrl, refreshToken) {
    const url = `${baseUrl}/tokenized/checkout/token/refresh`;



    const data = {
        'app_key': appKey,
        'app_secret': appSecret,
        'refresh_token': refreshToken,
    };

    return axios.post(url, data, { headers })
        .then(response => response.data)
        .catch(error => {
            throw new Error('Error in refresh token');
        });
}

module.exports = {
    grantToken,
    refreshAccessToken
};
