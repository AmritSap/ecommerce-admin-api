import express from "express";
const router = express.Router();
import { getUserByEmailAndRefeshJWT } from "../models/user/User.model.js";

import { verifyRefreshJWT, createAcessJWT } from "../helpers/jwt.helper.js";
router.all("*", (req, res, next) => {
  next();
});

// receive refreshJWT and return new accessJWT

router.get("/", async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      // call the functionto get accessJWT
      // 1.VERIFY storerefreshJWT
      const { email } = await verifyRefreshJWT(authorization);

      // 3.find out the user who the code belongs to
      if (email) {
        // 2.check if it is in the databse
        const user = await getUserByEmailAndRefeshJWT({
          email,
          refreshJWT: authorization,
        });

        console.log(user);

        if (user._id) {
          const tokenCreated = user.refreshJWT.addedAt;
          const tokenExpiryDate =
            tokenCreated.getDate() + +process.env.JWT_REFRESH_SECRET_EXP;
          tokenCreated.setDate(tokenExpiryDate);

          const today = Date.now();
          //   check if token expired

          if (tokenCreated > today) {
            const accessJWT = await createAcessJWT(email, user._id);
            console.log(accessJWT);
            console.log("token is valid");
            return res.json({
              status: "sucess",
              message: "here is your new accessJWT",
              accessJWT,
            });
          }
        }
      }
    }
    res.status(403).json({
      status: "error",
      message: "unauthoriuzed",
    });

    // 4.create new accessJWT and store in the sesion
    // 5response back to user
  } catch (error) {
    res.json({
      status: "error",
      message: "unauthorized",
    });
  }
});
export default router;
