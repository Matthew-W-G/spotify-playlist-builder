const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser")
const spotifyWebAPI = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.listen(3001);

app.post('/login', (req, res) => {
    console.log("REQUEST HERE:", req.body.code)
    const code = req.body.code
   
    var credentials = {
        clientId: 'bc038703857746eaab7721c0862ae10e',
        redirectUri: 'http://localhost:3000/'
    };
      
    var spotifyAPI = new spotifyWebAPI(credentials);

    spotifyAPI.authorizationCodeGrant(code).then(
        function(data) {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
      
          // Set the access token on the API object to use it in later calls
          spotifyAPI.setAccessToken(data.body['access_token']);
          spotifyAPI.setRefreshToken(data.body['refresh_token']);
          res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
        },
        function(err) {
          console.log('Error:', err);
        }
      );
})   