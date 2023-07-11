const { URL, Credentials } = require("../data/data");
const axios = require("axios");
async function GrantToken() {
  const headers = {
    username: Credentials.username,
    password: Credentials.password,
  };
  const data = {
    app_key: Credentials.app_key,
    app_secret: Credentials.app_secret,
  };
  
  axios
    .post(URL.GRANT_TOKEN, data, {headers})
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  return 0;
}

module.exports = GrantToken;
