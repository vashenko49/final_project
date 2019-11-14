const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const config = require('./index');
const LocalStrategy = require('passport-custom').Strategy;
const Customer = require('../models/Customer');
const axios = require('axios');
const {google} = require('googleapis');


module.exports = async passport => {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.JWT_SECRET;

    passport.use(
        "jwt",
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                let customer = Customer.fieldId(jwt_payload.id);
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
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                let customer = Customer.fieldId(jwt_payload.id);
                if (customer) {
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
            const oauth2Client = new OAuth2(config.oauth.google.clientID, config.oauth.google.clientSecret);
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
                url: `https://github.com/login/oauth/access_token?client_id=${config.oauth.github.clientID}&client_secret=${config.oauth.github.clientSecret}&code=${code}`,
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
