const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cors = require("cors");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/login/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

router.get("/gapi", cors({ origin: true }), (req, res, next) => {
  res.set("Referrer-Policy", "no-referrer-when-downgrade");
  // res.set("arya", "salam")("Referrer-Policy", "no-referrer-when-downgrade");
  res.set("arya", "salam");
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/gapi2/"
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
  ];
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    include_granted_scopes: true,
  });
  console.log(authorizationUrl);
  return res.status(301).redirect(authorizationUrl);
});
router.get("/gapi2", (req, res, next) => {
  const code = req.query.code; // Extract the 'code' parameter
  const scope = req.query.scope; // Extract the 'scope' parameter
  const authuser = req.query.authuser; // Extract the 'authuser' parameter

  // Create a JSON object with the extracted data
  const responseData = {
    code,
    scope,
    authuser,
  };
  console.log(responseData);
  // Send the JSON object to the client
  res.json(responseData);
  // return res.status(200).send("OK");
});

router.use(
  cors({
    origin: "http://localhost:3010",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

router.use((req, res, next) => {
  res.set("Access-Control-Allow-Headers", "Content-type, Authorization");
  next();
});

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res, next) => {
    if (req.user?.verified) {
      let token;
      const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { lastLogin: Date.now() }
      );
      if (user) {
        token = jwt.sign({ id: user._id }, "SECRET_KEY", {
          expiresIn: "1h",
        });
      } else {
        await User.create({
          email: req.user.email,
          name: req.user.displayName,
          profileImg: req.user.picture,
          language: req.user.language,
        })
          .then((user) => {
            token = jwt.sign({ id: user._id }, "SECRET_KEY", {
              expiresIn: "1h",
            });
          })
          .catch(next);
      }
      console.log(token);

      return res.status(201).redirect(`http://localhost:3010/?token=${token}`);
      // return res.status(201).json({ accessToken: token });
    }
  }
);

module.exports = router;
