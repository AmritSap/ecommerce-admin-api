import express from "express";
const router = express.Router();
import { loginVidation } from "../middlewares/formValidation.middleware.js";
import { createUser, getUserByEmailPass } from "../models/user/User.model.js";
router.all("*", (req, res, next) => {
  next();
});

router.post("/", loginVidation, async (req, res) => {
  try {
    console.log(req.body);
    const result = await getUserByEmailPass(req.body);
    console.log(result);
    if (result?._id) {
      return res.json({ status: "sucess", message: "login sucess", result });
    }
    res.json({ status: "error", message: "invalid login requested" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
