const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:"4570597769-7h8us0kc3jjv31r3bn45vnbmnsf8s791.apps.googleusercontent.com", // Your Credentials here.
    clientSecret:"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", // Your Credentials here.
    callbackURL:"http://127.0.0.1:3000/auth/google/callback",
    passReqToCallback:true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
