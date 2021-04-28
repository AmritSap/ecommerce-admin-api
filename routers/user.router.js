import express from "express";
const router = express.Router();
import { hassPassword } from "../helpers/bcrypthelpers.js";
import { newUserValidation } from "../middlewares/formValidation.middleware.js";
import {userAuthorization} from "../middlewares/authorization.middleware.js"
import { createUser, getUserById } from "../models/user/User.model.js";

router.all("*",(req, res, next) => {
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
      return res.json({ status: "sucess", message: "New account created", result });
    }
    res.json({ status: "error", message: "invalid details" });
  } catch (error) {
    console.log(error);
    if (error.message.includes("duplicate key error collection")) {
      return res.json({ status: "error", message: "This emaIL already exist" });
    }
    throw new Error (error.message);
  }
});

export default router;