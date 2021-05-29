import express from "express";
const router = express.Router();
import { hassPassword } from "../helpers/bcrypthelpers.js";
import {
  newUserValidation,
  updatePasswordValidation,
} from "../middlewares/formValidation.middleware.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { getRandOTP } from "../helpers/otp.helper.js";
import {
  createUser,
  getUserById,
  deleteRefreshJwtByUserId,
  getUserByEmail,
  updateNewPassword,
} from "../models/user/User.model.js";
import { emailProcessor } from "../helpers/email.helper.js";
import { deleteAccessJwtByUserId } from "../models/session/Session.model.js";
import {
  storeNewPin,
  findNewPin,
  deletePasswordResetPin,
} from "../models/reset-pin/ResetPin.model.js";

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

    //get user base on the email
    const adminUser = await getUserByEmail(email);

    ////lots of work to be done
    if (adminUser?._id) {
      //1. create OTP
      const otpLength = 6;
      const otp = await getRandOTP(otpLength);
      //store otp in db
      const newOtp = {
        otp,
        email,
      };

      const result = await storeNewPin(newOtp);

      if (result?._id) {
        console.log("email this datat to user", result);
        //2. email OTP to the admin
        const { otp, email } = result;
        const mailInfo = {
          type: "OTP_REQUEST",
          otp,
          email,
        };
        emailProcessor(mailInfo);
      }
    }

    res.send({
      status: "sucess",
      message:
        "If your email is found in our system, we will send you the password rest instruction. IT may take upto 5min to arrive the email. Please check your junk/spam folder if you don't see email in  your inbox.",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message:
        "Error! There is some problem in our system, please try again later.",
    });
  }
});

router.post("/password", updatePasswordValidation, async (req, res) => {
  try {
    const { otp, password, email } = req.body;
    console.log("from",otp,password,email)
    // check the pin
    const pinInfo = await findNewPin({otp,email});
    // update password
    if (pinInfo?._id) {
      const hashPass = await hassPassword(password);

      if (hashPass) {
        const result = await updateNewPassword({
          email: pinInfo.email,
          hashPass,
        });
      }

      // delete the otp
      deletePasswordResetPin(pinInfo._id);
      if (result._id) {
        emailObj = {
          type: "PDATE_PASS_SUCESS",
          email,
        };
        emailProcessor(emailObj);
        return res.send({
          status: "sucess",
          message: "PASSWORD UPDATED",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message:
        "Error! There is some problem in our system, please try again later.",
    });
  }
});

export default router;
