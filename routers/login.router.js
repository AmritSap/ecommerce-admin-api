import express from "express";
const router = express.Router();
import {loginVidation} from "../middlewares/formValidation.middleware.js";
router
  .all("*", (req, res, next) => {
   
    next();
  })
  .post("/",loginVidation,(req, res) => {
      console.log(req.body)
    res.json({ message: "login requested" });
  });
 
export default router;
