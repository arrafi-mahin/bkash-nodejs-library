// const express = require('express')
const axios = require('axios');
const { createAgreement, executeAgreement, queryAgreement } = require('./methods/Agreement');
// const { refreshToken } = require('./methods/Token');

// const { createAgreement } = require('./services/payment/Agreement');

// const app = express()
// const port = process.env.PORT || 5000



// app.get('/createAgreement', createAgreement)



// username = "sandboxTokenizedUser02"


// password = "sandboxTokenizedUser02@12345"


// appKey = "4f6o0cjiki2rfm34kfdadl1eqq"


// appSecret = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b"



const sandbox = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/';
const live = '...'; // Provide the live URL

const username = 'sandboxTokenizedUser02';
const password = 'sandboxTokenizedUser02@12345';
const appKey = '4f6o0cjiki2rfm34kfdadl1eqq';
const appSecret = '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b';
const isLive = false;

class Bkash {
    constructor(username, password, appKey, appSecret, isLive) {
        this.username = username;
        this.password = password;
        this.appKey = appKey;
        this.appSecret = appSecret;
        this.baseUrl = isLive ? live : sandbox;

        this.scheduleRecurringFunction();
        this.grantToken();
    }

    scheduleRecurringFunction() {
        const intervalInMilliseconds = 55 * 60 * 1000; // 55 minutes
        setInterval(async () => {
            await this.refreshToken();
        }, intervalInMilliseconds);
    }

    async grantToken() {
        const { username, password, appKey, appSecret, baseUrl } = this;
        const url = `${baseUrl}tokenized/checkout/token/grant`;

        const headers = {
            username,
            password
        };
        const data = {
            app_key: appKey,
            app_secret: appSecret,
        };

        try {
            const response = await axios.post(url, data, { headers });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error('Error in grantToken request');
        }
    }

    async refreshToken() {
        const { username, password, appKey, appSecret, baseUrl } = this;
        const url = `${baseUrl}tokenized/checkout/token/refresh`;

        try {
            const tokenResponse = await this.grantToken();
            const refreshToken = tokenResponse.refresh_token;

            const headers = {
                username,
                password
            };

            const data = {
                app_key: appKey,
                app_secret: appSecret,
                refresh_token: refreshToken
            };

            const response = await axios.post(url, data, { headers });
            // console.log("refresh", response.data);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.statusMessage);
        }
    }
    async getHeadersForAgreement() {
        const { username, password } = this;
        const tokenResponse = await this.grantToken();
        const token = tokenResponse.id_token;

        return {
            'Authorization': token,
            'X-App-Key': appKey,
        };
    }
    async createAgreement(payerReference, callbackURL, amount) {
        const { username, password, appKey, appSecret, baseUrl } = this;
        const url = `${baseUrl}tokenized/checkout/create`;

        try {
            const headers = await this.getHeadersForAgreement();

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
            console.log(error);
        }
    }
}


const b = new Bkash(username, password, appKey, appSecret, isLive);
b.createAgreement('01970851626', 'https://rafi.netlify.app', '0.01')
// grantToken(ceredentials)
// refreshToken(ceredentials)
// createAgreement(ceredentials)
// executeAgreement(ceredentials)
// queryAgreement(ceredentials)


// app.listen(port, () => {
//     console.log(`portal listening on port ${port}`)
// })