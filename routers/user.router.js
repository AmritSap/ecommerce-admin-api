import express from "express";
const router = express.Router();
import { hassPassword } from "../helpers/bcrypthelpers.js";
import { newUserValidation } from "../middlewares/formValidation.middleware.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { getRandOTP } from "../helpers/otp.helper.js";
import {
  createUser,
  getUserById,
  deleteRefreshJwtByUserId,
  getUserByEmail,
} from "../models/user/User.model.js";
import { deleteAccessJwtByUserId } from "../models/session/Session.model.js";
import { storeNewPin } from "../models/reset-pin/ResetPin.model.js";
router.all("*", (req, res, next) => {
  next();
});

router.get("/", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.send({
        status: "error",
        message: "invalid request",
      });
    }

    const user = await getUserById(_id);
    if (user) user.password = undefined;

    user._id
      ? res.send({
          status: "sucess",
          message: "Hey!! Welcome to your profile.",
          user,
        })
      : res.send({
          status: "error",
          message: "invalid request",
        });
  } catch (err) {
    res.send({
      status: "error",
      message: "Invalid request",
    });
  }
});

router.post("/", newUserValidation, async (req, res) => {
  try {
    const { password } = req.body;
    const hassPass = await hassPassword(password);
    const newUser = { ...req.body, password: hassPass };

    const result = await createUser(newUser);

    if (result?._id) {
      return res.json({
        status: "sucess",
        message: "New account created",
        result,
      });
    }
    res.json({ status: "error", message: "invalid details" });
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error collection")) {
      return res.json({ status: "error", message: "This emaIL already exist" });
    }
    throw new Error(error.message);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { _id } = req.body;
    // const { accessJWT,refreshJWT } = req.body;
    // delete access JWT from session

    deleteAccessJwtByUserId(_id);

    // delete refreshJWT from user

    deleteRefreshJwtByUserId(_id);
    res.send({ status: "sucess", message: "logout" });
  } catch (error) {
    res.send({ status: "error", message: "SOMETHGING WORNG" });
  }
});

router.post("/otp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    //  get user basred on email
    const admin = await getUserByEmail(email);
    console.log(admin);
    if (admin._id) {
      // create OTP
      const otpLength = 6;
      const otp = await getRandOTP(otpLength);
      // email otp to the admin

      //  many things to be done
      const newOtp = {
        otp,
        email,
      };
      const result = await storeNewPin(newOtp);
      if (result._id) {
        console.log("EMAIL DATA TO USER ");
      }
    }
    res.send({
      status: "sucess",
      message:
        "if ur email is found in system we will send u the password reset instruction it may take upto 5 minutes,Please check your junk/email/spam folder",
    });
  } catch (error) {
    res.send({
      status: "error",
      message: "Error! There is some problem in the system,please try again",
    });
  }
});
export default router;
