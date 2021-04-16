import express from "express";
const router = express.Router();
import slugify from "slugify";
import {
  getCategories,
  insertCategory,
  deleteCategories,
} from "../models/category/Category.model.js";
router.all("*", (req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  try {
    const result = await getCategories();
    res.json({
      status: "sucess",
      message: "fetching sucess",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

router.post("/", async (req, res) => {
  const { name, parentCategory } = req.body;
  try {
    const newCat = {
      name,
      slug: slugify(name, { lower: true }),
      parentCategory,
    };
    const result = await insertCategory(newCat);
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


router.delete("/", async (req, res) => {
  const { name, parentCategory } = req.body;
  const catIds = req.body;
  try {
  
    const result = await deleteCategories(catIds);
    if(result.deletedCount){
    res.json({
      status: "sucess",
      message: "Category deleted",
      result,
    });
  }
  
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});


export default router;
