import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';

import MongoDbConnection from './configuration/mongoDbConfig.js';
import authRoutes from './routes/auth.js';
import twilioRoutes from './routes/twilioSms.js';
import googleAuth from './controllers/googleAuth.js';


dotenv.config();
const app = express();
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.EXPRESS_COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
}));

// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
app.use("/auth", authRoutes);
app.use("/twilio", twilioRoutes);
app.use("/google", googleAuth);






MongoDbConnection();

const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})




