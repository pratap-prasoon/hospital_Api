const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/doctor');
//use header to receive jwt token and secret key to require for verification
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

//used for the authentication check
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    //find the user with jwtpayload id
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log('error in finding user from JWT');
      }
      //if user found then current user authorized
      if (user) {
        return done(null, user);
      } else {
        //if user found and something went wrong then he/she not authorized
        return done(null, false);
      }
    });
  }),
);

module.exports = passport;