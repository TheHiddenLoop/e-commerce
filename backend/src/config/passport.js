import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import { handleGoogleAuth } from "../services/googleAuthService.js";
import { handleFacebookAuth } from "../services/facebookAuthService.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://e-commerce-2-0r1h.onrender.com/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleGoogleAuth(profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://e-commerce-2-0r1h.onrender.com/api/v1/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await handleFacebookAuth(profile);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const { default: User } = await import("../models/user.js");
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
