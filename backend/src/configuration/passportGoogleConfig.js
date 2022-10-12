import dotenv from "dotenv";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userSchema from '../models/userModel.js';

dotenv.config();

const passportGoogle = async () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);
            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            try {
                let existingUser = await userSchema.findOne({ 'google.id': profile.id });
                console.log("existingUser", existingUser);
                // if user exists return the user 
                if (existingUser) {
                    return done(null, existingUser);
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new userSchema({
                    method: 'google',
                    google: {
                        id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    },
                    password: "ali"
                });
                await newUser.save();
                return done(null, newUser);
            } catch (error) {
                return done(error, false)
            }
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userSchema.findById(id).then((user) => {
            done(null, user);
        });
    });
}

export default passportGoogle;

