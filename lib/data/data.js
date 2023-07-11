// URL
const URL = {
  BASE_URL:  ,
  GRANT_TOKEN:
    "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/grant",
  REFRESH_TOKEN: "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/token/refresh",
  CREATE_AGREEMENT: "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create",
  EXECUTE_AGREEMENT: "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/execute",
  CREATE_PAYMENT: "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/create",
  PAYMENT_REFUND: "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout/payment/refund",
};

// Credentials
const Credentials = {
  username: "sandboxTokenizedUser02",
  password: "sandboxTokenizedUser02@12345",
  app_key: "4f6o0cjiki2rfm34kfdadl1eqq",
  app_secret: "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b",
  callbackURL: "https://rafi.netlify.app",
  payerReference: "01770618575",
};
const TOKEN = {
  ID_TOKEN:"",
  REFRESH_TOKEN:"",
}
const AGREEMENT ={
  PAYMENT_ID: '',
  AGREEMENT_ID: "",
}
module.exports = { URL, Credentials, TOKEN, AGREEMENT };
