const Token = require("./lib/features/Token");
const Agreement = require("./lib/features/Agreement");
const Payment = require("./lib/features/Payment");
Token.GrantToken();

setTimeout(()=>{
    Agreement.createAgreement()
}, 5000);

setTimeout(()=>{
    Agreement.excuteAgreement()
}, 60 * 1000);
setTimeout(()=>{
    Payment.createPayment();
},80 * 1000)