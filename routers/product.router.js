import express from "express";
const router = express.Router();
import slugify from "slugify";

import {
  insertProduct,
  getProduct,
  deleteProduct,
  getProductById,
  updateProductById,
} from "../models/product/Product.model.js";

import {
  newProductVidation,
  updateProductVidation,
} from "../middlewares/formValidation.middleware.js";

router.all("*", (req, res, next) => {
  next();
});

router.get("/:_id?", async (req, res) => {
  const { _id } = req.params;

  try {
    const result = _id ? await getProductById(_id) : await getProduct();

    res.json({
      status: "sucess",
      message: "Here are all products",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});

router.put("/", updateProductVidation, async (req, res) => {
  // seperates the id from formDt and send it different
  const { _id, ...formDt } = req.body;

  try {
    const result = await updateProductById({ _id, formDt });
    if (result?._id) {
      res.json({
        status: "sucess",
        message: "product updated",
        result,
      });
    }
    res.json({
      status: "error",
      message: "failed to update product",
      result,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
});
router.post("/", newProductVidation, async (req, res) => {
  try {
    const addNewProd = {
      ...req.body,
      slug: slugify(req.body.name, { lower: true }),
    };

    const result = await insertProduct(addNewProd);

    if (result._id) {
      return res.json({
        status: "sucess",
        message: "the product has been addded",
        result,
      });
    }
    res.json({
      status: "error",
      message: "Unable to add the product,Plese come back later",
    });
  } catch (error) {
    throw error;
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        status: "error",
        message: "Unable to add the product, Please try again later",
      });
    }

    const result = await deleteProduct(req.body);
    console.log(result);

    if (result?._id) {
      return res.json({
        status: "sucess",
        message: "The product has been deleted.",
        result,
      });
    }

    res.json({
      status: "error",
      message: "Unable to delete the product, Please try again later",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export default router;
