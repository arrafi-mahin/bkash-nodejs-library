const { URL, Credentials, TOKEN } = require("../data/data");
const axios = require("axios");
const Token ={

 GrantToken: async() => {
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
    TOKEN.ID_TOKEN = res.data.id_token;
    TOKEN.REFRESH_TOKEN= res.data.refresh_token;
    // console.log("Grant token",TOKEN);
    Token.RefreshToken()
  })
  .catch((err) => console.log(err));
  return 0;
},
  RefreshToken:  async () => {
    const headers = {
      username: Credentials.username,
      password: Credentials.password,
    };
    const data = {
      app_key: Credentials.app_key,
      app_secret: Credentials.app_secret,
      refresh_token: TOKEN.REFRESH_TOKEN,
    };
    setInterval(()=>{
      axios
      .post(URL.REFRESH_TOKEN, data, {headers})
      .then((res) => {
        TOKEN.ID_TOKEN = res.data.id_token;
        TOKEN.REFRESH_TOKEN= res.data.refresh_token;
        // console.log("Refresh token",res.data);
      })
      .catch((err) => console.log(err));
    }, 55 * 60 * 1000)
  }
}

module.exports = Token;
