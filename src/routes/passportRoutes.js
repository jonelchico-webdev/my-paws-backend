const passport = require('passport');
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback',
        // passport.authenticate('google'),
        passport.authenticate('google', {
            failureRedirect: '/auth/google'
        }),
        async (req, res) => {

            const token = jwt.sign({ userId: req.user._id }, keys.secretKey);
            // res.append({ token })

            // console.log(token)
            res.redirect(keys.appURL + '/?token=' + token)
            // console.log(req)
            // res.send({ token })
        }
    );

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['id', 'email', 'first_name', 'last_name']
    }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook')
        // passport.authenticate('facebook', {
        //     failureRedirect: '/auth/facebook'
        // }),
        // async (req, res) => {

        //     const token = jwt.sign({ userId: req.user._id }, keys.secretKey);
        //     // res.append({ token })

        //     console.log(token)
        //     res.redirect('exp://192.168.43.181:19000/?token=' + token)
        //     // console.log(req)
        //     // res.send({ token })
        // }
    );






    // router.get('auth/linkedin/logout', function(req, res) {
    //     req.logout()
    //     res.redirect('/')
    //   })
    // router.get('/auth/linkedin', passport.authenticate('linkedin', (err, user, info) => {
    //     if (err) { return next(err) }
    //   }), async (req, res, next) => {
    //     // The request will be redirected to LinkedIn for authentication, so this
    //     // function will not be called.
    //     console.log('auth/linkedin',req)
    //     res.redirect('/')
    //     next()
    //   })
    // router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
    //       successRedirect: '/auth/linkedin/redirect',
    //       failureRedirect: '/auth/linkedin'
    //     }), async (req, res, next) => {
    //         // console.log(req.user.dataValues)
    //         res.send(req.user.dataValues)
    //   })
    // // Redirect the user back to the app
    // router.get('/auth/linkedin/redirect', async (req, res, next) => {
    //   // you can see what you get back from LinkedIn here:
    //   console.log(req.user.dataValues) 
    //   res.redirect(<deep-link-to-react-native-app>)
    //   })


    // app.get('/api/logout', (req, res) => {
    //     req.logout();
    //     res.send(req.user);
    // })

    // app.get('/api/current_user', (req, res) => {
    //     res.send(req.user);
    // })
};

