const { URL,TOKEN , Credentials, AGREEMENT} = require("../data/data")

const axios =require('axios')
const Agreement =()=> {
    const createAgreement=async ()=>{
        const headers = {
            authorization: TOKEN.ID_TOKEN,
            "x-app-key": Credentials.app_key
        }
        const data = {  
            mode: "0000",
            callbackURL: Credentials.callbackURL,
            payerReference: Credentials.payerReference,
            
         }
         axios
      .post(URL.CREATE_AGREEMENT, data, {headers})
      .then((res) => {
        AGREEMENT.PAYMENT_ID = res.data.paymentID;
        console.log("agreement",res.data.bkashURL);
        // res.data.bkashURL.redirect
      })
      .catch((err) => console.log(err));
    };
   const excuteAgreement=()=>{
        const headers = {
            authorization: TOKEN.ID_TOKEN,
            "x-app-key": Credentials.app_key
        }
        const data = {  
            paymentID: AGREEMENT.PAYMENT_ID
            
         }
         axios
      .post(URL.EXECUTE_AGREEMENT, data, {headers})
      .then((res) => {
        AGREEMENT.AGREEMENT_ID = res.data.agreementID
        // console.log("Execute Agreement",res.data);
      })
      .catch((err) => console.log(err));
    }
    createAgreement();
    return this;
}
module.exports = Agreement