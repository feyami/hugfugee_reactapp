import express from "express";
import  googleAuth from "../controllers/googleAuth.js";
import UserSchema from '../models/userModel.js';

const router = express.Router();

router.get("/login/success", async (req, res) => {
  const id = req.user?.id;
  if (req.user) {
      const user = await UserSchema.findById(id).populate('languages');
      res.status(200).json({
          success: true,
          message: "successfully authenticated",
          user,
          //   cookies: req.cookies
      });
  }
});

  router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "Error when login",
    });
  });
  
  router.get("/logout", (req, res) => {
    console.log("logout");
    req.session.destroy(function (err) {
      res.redirect(process.env.CLIENT_URL);
    });
  });
//* Google Auth
router.use("/google", googleAuth);

router.get('/' , (req, res) => {
  res.send('Hello World!')
  console.log('Hello World!');
})



export default router;