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
import userRoutes from './routes/user.js';
import languageRoutes from './routes/language.js';
import { createServer } from "http";
import { Server } from "socket.io";

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
app.use("/user", userRoutes);
app.use("/language", languageRoutes);

//*Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});



MongoDbConnection();

const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
})




