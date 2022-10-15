 
import {sendSMS, verifySMS} from "../controllers/twillioSms.js";
import express from "express";
const router = express.Router();

router.post('/sendSMS', sendSMS);
router.post('/verifySMS', verifySMS);

router.get('/' , (req, res) => {
    res.send('Hello World!')
    console.log('Hello World!');
})


export default router;

