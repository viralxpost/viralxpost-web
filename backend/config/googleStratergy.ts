import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { config } from "./config";
import User from "../models/user";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientId as string,
      clientSecret: config.googleSecretKey as string,
      callbackURL: config.callbackUrl,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any) => void) => {
      try {
        // Find the user based on their Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If the user is not found, create a new user
          user = new User({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            password: '', // You may want to handle password properly, maybe generate a random one
            googleId: profile.id,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, (user as any)._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
