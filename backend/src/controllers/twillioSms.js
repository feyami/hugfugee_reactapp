import dotenv from "dotenv";
import express from "express";
import twilio from "twilio";
import UserSchema from '../models/userModel.js';
const accountSid = process.env.TWILIOACCOUNTSID; // Your Account SID from www.twilio.com/console
const authSMSToken = process.env.TWILIOTOKEN; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authSMSToken);

export const sendSMS = async (req, res) => {
  try {
    console.log(req.body);
    const { phoneNumber, _id } = req.body;
    const user = await UserSchema.findById(_id);
    const code = Math.floor(100000 + Math.random() * 900000)
    let newUser = ( user, {"smsVerificationCode": code} );
    await UserSchema.findOneAndUpdate({_id}, {$set: newUser}, )  
    const sms = await client.messages.create({
      body: `Your verification code is ${code}`,
      to: "+"+phoneNumber, 
      from: process.env.TWILIONUMBER, 
    });
    res.status(200).json(sms);
    console.log("sms", sms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifySMS = async (req, res) => {
    try {
      console.log(req.body);
      const { _id, smsVerificationCode } = req.body;
      const user = await UserSchema.findById(_id);
      if (user.smsVerificationCode === smsVerificationCode) {
        res.status(200).json({ message: "Code verified" });
      } else {
        res.status(404).json({ message: "Code not verified" });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

    


