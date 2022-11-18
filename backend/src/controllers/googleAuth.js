import dotenv from "dotenv";
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userSchema from '../models/userModel.js';
import express from 'express'
dotenv.config();

const router = express.Router()

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
            console.log("done", done);
            try {
                //* check if user already exists in our own db by user route


                let existingUser = await userSchema.findOne({ 'google.id': profile.id });
                console.log("existingUser", existingUser);
                // if user exists return the user 
                if (existingUser) {
                    return done(null, existingUser );
                }
                // if user does not exist create a new user 
                console.log('Creating new user...');
                const newUser = new userSchema({
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    photo: profile.photos[0].value,
                    role: 'volunteer',
                    google: {
                        id: profile.id,
                        displayName: profile.displayName,
                        name: profile.name,
                        emails: profile.emails, 
                        photos: profile.photos,
                    },
                    password: "ali"
                });
                await newUser.save();
                return done(null, newUser );
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
passportGoogle();


router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}/dashboard/profile`,
        failureRedirect: "/auth/login/failed",
        session: true
    })
);

export default router












