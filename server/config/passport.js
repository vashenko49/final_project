const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-custom').Strategy;
const Customer = require('../models/Customer');
const axios = require('axios');
const {google} = require('googleapis');
const mongoose = require('mongoose');


module.exports = async passport => {
  const optsJWT = {};
  optsJWT.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  optsJWT.secretOrKey = process.env.JWT_SECRET;
  const optsJWTEMAIL = {};
  optsJWTEMAIL.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  optsJWTEMAIL.secretOrKey = process.env.JWT_FORGOT_PASSWORD;

  passport.use(
    "jwt",
    new JwtStrategy(optsJWT, async (jwt_payload, done) => {
      try {
        const {_id} = jwt_payload.data;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          return done(null, false);
        }
        let customer = await Customer.findById(_id);
        if (customer) {
          return done(null, customer);
        }
        return done(null, false);
      } catch (e) {
        return done(e, false, e.message);
      }

    })
  );


  //forgot password
  //сделал специально что бы пользователь не имел доступа с текущим токенов до любых данных
  passport.use(
    "jwt-email",
    new JwtStrategy(optsJWTEMAIL, async (jwt_payload, done) => {
      try {
        const {_id} = jwt_payload;
        let customer = await Customer.findById(_id);
        if (customer) {
          return done(null, customer);
        }
        return done(null, false);
      } catch (e) {
        return done(e, false, e.message);
      }

    })
  );

  passport.use(
    "jwt-admin",
    new JwtStrategy(optsJWT, async (jwt_payload, done) => {
      try {
        const {_id} = jwt_payload.data;
        let customer = await Customer.findById(_id);
        const {isAdmin} = customer;
        if (isAdmin) {
          return done(null, customer);
        }
        return done(null, false);
      } catch (e) {
        return done(e, false, e.message);
      }
    })
  );

  passport.use('google-local', new LocalStrategy(async function (req, done) {
    try {
      const {access_token} = req.body;

      const OAuth2 = google.auth.OAuth2;
      const oauth2Client = new OAuth2(process.env.google_clientID, process.env.google_clientSecret);
      oauth2Client.setCredentials({access_token});
      const oauth2 = google.oauth2({
        auth: oauth2Client,
        version: "v2"
      });
      oauth2.userinfo.get(function (err, response) {
        if (err) {

          done(err, false, err.message);
        } else {
          const {email, given_name, family_name, picture} = response.data;
          const customer = {
            firstName: given_name,
            lastName: family_name,
            email: email,
            avatarUrl: picture,
            typeSocial: 0
          };

          done(null, customer);
        }
      });
    } catch (e) {
      return done(e, false, e.message);
    }

  }));

  passport.use('facebook-local', new LocalStrategy(async function (req, done) {
    try {
      const {access_token, client_id} = req.body;
      let response = await axios.get(`https://graph.facebook.com/v2.11/${client_id}?fields=id,name,picture,email&access_token=${access_token}`);

      let fullname = response.data.name.split(' ');
      let email = response.data.email;
      let picture = response.data.picture.data.url;

      const customer = {
        firstName: fullname[0],
        lastName: fullname[1],
        email: email,
        avatarUrl: picture,
        typeSocial: 1
      };

      return done(null, customer);

    } catch (e) {
      return done(e, false, e.message);
    }
  }));

  passport.use('github-local', new LocalStrategy(async function (req, done) {

    try {

      const {code} = req.body;

      let getAccessToken = await axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${process.env.github_clientID}&client_secret=${process.env.github_clientSecret}&code=${code}`,
        headers: {
          accept: 'application/json'
        }

      });


      let getUsersEmail = await axios({
        method: 'get',
        url: `https://api.github.com/user/emails`,
        headers: {
          Authorization: `token ${getAccessToken.data.access_token}`
        }
      });

      let customersEmail = getUsersEmail.data[0].email;


      let response = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
          Authorization: `token ${getAccessToken.data.access_token}`
        }
      });


      let fullname = response.data.name.split(' ');

      let customer = {
        firstName: fullname[1],
        lastName: fullname[0],
        email: customersEmail,
        avatarUrl: response.data.avatar_url,
        typeSocial: 3
      };

      return done(null, customer);

    } catch (e) {
      return done(e, false, e.message);
    }
  }));

};
