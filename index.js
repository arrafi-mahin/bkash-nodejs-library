const axios = require("axios");
// import axios from "axios";
// import as a whole
const {
  createAgreement,
  executeAgreement,
  queryAgreement,
} = require("./methods/Agreement");
const { grantToken, refreshAccessToken } = require("./methods/Token");
const { createPayment, executePayment } = require("./methods/Payment");
const { searchPayment } = require("./methods/Search");
const { refundPayment, checkRefund } = require("./methods/Refund");

const sandbox = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/";
const live = "..."; // Provide the live URL

const username = "sandboxTokenizedUser02";
const password = "sandboxTokenizedUser02@12345";
const appKey = "4f6o0cjiki2rfm34kfdadl1eqq";
const appSecret = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";
const isLive = false;

class Bkash {
  id_token = "";
  refreshToken = "";
  paymentId = ""; // not needed here
  agreementId = ""; // not needed here
  invoicePaymentId = ""; // not needed here
  invoiceAgreementId = ""; // not needed here
  trxId = ""; // not needed here
  refundAmount = ""; // not needed here

  constructor(username, password, appKey, appSecret, isLive) {
    // object // serial break for function
    this.username = username;
    this.password = password;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.baseUrl = isLive ? live : sandbox;

    this.scheduleRecurringFunction();
    this.res();
  }
  async res() {
    const headers = await this.getHeaders(true);
    const data = await grantToken(
      headers,
      this.appKey,
      this.appSecret,
      this.baseUrl
    );
    this.id_token = data.id_token;
    this.refreshToken = data.refresh_token;
    // console.log(this.id_token);
  }

  async getHeaders(isToken) {
    if (isToken) {
      return {
        username: this.username,
        password: this.password,
      };
    }
    return {
      Authorization: this.id_token,
      "X-App-Key": this.appKey,
    };
  }

  scheduleRecurringFunction() {
    const intervalInMilliseconds = 55 * 60 * 1000; // 55 minutes
    setInterval(async () => {
      const headers = await this.getHeaders(true);
      const data = await refreshAccessToken(
        headers,
        this.appKey,
        this.appSecret,
        this.baseUrl,
        this.refreshToken
      );
      this.id_token = data.id_token;
      this.refreshToken = data.refresh_token;
    }, intervalInMilliseconds);

    // interval clear when destructing object
  }

  // convention maintain for name
  async cAgreement(payerReference, callbackURL, amount) {
    const headers = await this.getHeaders(false);
    const response = await createAgreement(
      payerReference,
      callbackURL,
      amount,
      headers,
      this.baseUrl
    );
    console.log(response);
    this.paymentId = response.paymentID;
    return response;
  }
  async eAgreement(paymentId) {
    const headers = await this.getHeaders(false);
    const response = await executeAgreement(headers, this.baseUrl, paymentId);
    this.agreementId = response.agreementID;
    // console.log(response);
    return response;
  }
  async checkAgreement(agreementID, operation) {
    const headers = await this.getHeaders(false);
    const response = await queryAgreement(
      headers,
      this.baseUrl,
      agreementID,
      operation
    );
    // console.log(response);
    return response;
  }
  async cPayment(
    agreementID,
    payerReference,
    callbackURL,
    amount,
    merchantInvoiceNumber
  ) {
    const headers = await this.getHeaders(false);
    const response = await createPayment(
      headers,
      this.baseUrl,
      agreementID,
      payerReference,
      callbackURL,
      amount,
      merchantInvoiceNumber
    );
    // console.log(response);
    this.invoicePaymentId = response.paymentID;
    this.invoiceAgreementId = response.agreementID;
    console.log(response);
    return response;
  }

  async ePayment(paymentID, operation) {
    const headers = await this.getHeaders(false);
    const response = await executePayment(
      headers,
      this.baseUrl,
      paymentID,
      operation
    );
    this.trxID = response.trxID;
    // console.log(response);
    return response;
  }

  async search(trxID) {
    const headers = await this.getHeaders(false);
    const response = await searchPayment(headers, this.baseUrl, trxID);
    // console.log(response);
    this.refundAmount = response.amount;
    return response;
  }

  async reqRefund(paymentID, amount, trxID, sku, reason) {
    const headers = await this.getHeaders(false);
    const response = await refundPayment(
      headers,
      this.baseUrl,
      paymentID,
      amount,
      trxID,
      sku,
      reason
    );
    // console.log(response);
    return response;
  }

  async refundStatus(paymentID, trxID) {
    const headers = await this.getHeaders(false);
    const response = await checkRefund(headers, this.baseUrl, paymentID, trxID);
    // console.log(response);
    return response;
  }
}

const b = new Bkash(username, password, appKey, appSecret, isLive);

async function run() {}

setTimeout(async () => {
  const res = await b.cAgreement(
    "01770618575",
    "https://rafi.netlify.app",
    "100"
  );
  if (res.paymentId) {
    console.log(b.paymentId, b.agreementId);
    const agree = await b.eAgreement(b.paymentId);
    if (agree) {
      b.checkAgreement(b.agreementId, "query");
      b.checkAgreement(b.agreementId, "cancel");
    }
  }
  b.cPayment(
    b.agreementId,
    "01970851626",
    "https://rafi.netlify.app",
    "100",
    "72"
  );
  b.ePayment(b.invoicePaymentId, "execute");
  b.search(b.trxId);
  b.reqRefund(
    b.invoicePaymentId,
    b.trxId,
    b.refundAmount,
    "Iphone",
    "color pochondo hoi nai"
  );
  b.refundStatus(b.trxId, b.refundAmount);
}, 3000);

module.exports = Bkash;
