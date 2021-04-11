import express from 'express'
const router = express.Router();
import { getCategories,insertCategory } from "../models/category/Category.model.js";
router.all("*", (req, res, next) => {
  next();
});

router.get("/", async(req,res)=>{
    try {
        const result = await getCategories();
        res.json({
            status: "sucess", message: "fetching sucess", result
        })
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }

})

router.post("/", async (req, res) => {
  try {
    const result = await insertCategory(req.body);
    res.json({
      status: "sucess",
      message: "new category saved",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});



export default router;
