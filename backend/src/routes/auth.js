import express from "express";
import  googleAuth from "../controllers/googleAuth.js";

const router = express.Router();
router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
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