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
  // const response = await axios({
  //   method: "POST",
  //   url: URL.GRANT_TOKEN,
  //   headers,
  //   data,
  // });
  console.log(data, headers);
  // console.log(response.data);
  return 0;
}

module.exports = GrantToken;
