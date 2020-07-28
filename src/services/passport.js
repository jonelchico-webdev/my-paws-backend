const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// find ID from mongoDB
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// // once found
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            // User.findOrCreate({ googleId: profile.id }, (err, user) => {
            //     return cb(err, user)
            // })

            // console.log(profile)


            const { id, _json: { email, given_name, family_name } } = profile

            User.findOne({ googleId: id })
                .then((existingUser) => {
                    if (existingUser) {
                        // Found record
                        return done(null, existingUser);
                    } else {
                        new User({
                            googleId: id,
                            firstName: given_name,
                            lastName: family_name,
                            email: email
                        })
                            .save()
                            .then(user => { return done(null, user) });
                    }
                })

        }
    )
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    },
        (accessToken, refreshToken, profile, done) => {
            // User.findOrCreate({ facebookId: profile.id }, (err, user) => {
            //     return cb(err, user)
            // })

            console.log(profile)

            // return done(null, profile)
            // const { id, _json: { email, given_name, family_name } } = profile

            // User.findOne({ facebookId: id })
            //     .then((existingUser) => {
            //         if (existingUser) {
            //             // Found record
            //             return done(null, existingUser);
            //         } else {
            //             new User({
            //                 facebookId: id,
            //                 firstName: given_name,
            //                 lastName: family_name,
            //                 email: email
            //             })
            //                 .save()
            //                 .then(user => { return done(null, user) });
            //         }
            //     })

        }
    )
);