import express from "express";
const router = express.Router();
import { comparePassword } from "../helpers/bcrypthelpers.js";
import { loginValidation } from "../middlewares/formValidation.middleware.js";
 import { createAcessJWT, createRefreshJWT } from "../helpers/jwt.helper.js";

import { getUserByEmail, } from "../models/user/User.model.js";

router.all("*", (req, res, next) => {
  next();
});


router.post("/", loginValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await getUserByEmail(email);

    if (!user?._id) {
      return res.status(403).json({ status: "error", message: "Invalid login details", });
    }

    const dbHasPass = user.password;
    const result = await comparePassword(password, dbHasPass);
   if (!result)
   {
     return res.json({status:"error",message:"invalid login details"})
   }
  //  create accessJWT
  const accessJWT = await createAcessJWT(user.email,user._id)
    const refreshJWT = await createRefreshJWT(user.email, user._id);
    user.password = undefined;
    // user.refreshJWT = undefined;
       res.json({
               status: "sucess",
               message: "login sucess",
               user,
               accessJWT,
               refreshJWT,
             })
       


  } catch (error) {
    console.log(error);
    throw new Error (error.message);
  }
});



export default router;
