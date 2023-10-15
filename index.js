const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const config = require("./config/config");
const router = require("./routes/userRouter");

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET"
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID:config.facebookAuth.clientID,
    clientSecret:config.facebookAuth.clientScrete,
    callbackURL:config.facebookAuth.callbackURL
   },
   function(accessToken, refreshToken, profile, done){
    return done(null, profile)
   }

));

app.use('/',router)

app.listen(port, () => {
  console.log("Server is running on ","http://localhost:"+port);
});
