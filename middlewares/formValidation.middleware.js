import joi from "joi";

const shortStr = joi.string().max(100);
const longStr = joi.string().max(2000);
const email = joi.string().min(3).max(50).required();
const password = joi.string().required();
const date = joi.date().allow(null);
const num = joi.number();
const args = joi.array();
const boolean = joi.boolean();

export const newProductVidation = (req, res, next) => {
  const schema = joi.object({
    name: shortStr.required(),
    status: boolean,
    qty: num.required(),
    price: num.required(),
    salePrice: num,
    saleEndDate: date,
    description: longStr.required(),
    images: args,
    categories: args,
  });

  //validation
  const value = schema.validate(req.body);

  if (value.error) {
    return res.json({
      status: "error",
      message: value.error.message,
    });
  }
  next();
};
export const loginVidation = (req, res, next) => {
  const schema = joi.object({ email, password });

  //validation
  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({
      status: "error",
      message: value.error.message,
    });
  }
  next();
};

export const updateProductVidation = (req, res, next) => {
  const schema = joi.object({
    _id: shortStr.required(),
    status: boolean.required(),
    slug: shortStr.required(),
    name: shortStr.required(),
    qty: num.required(),
    price: num.required(),
    salePrice: num,
    saleEndDate: date,
    description: longStr.required(),
    images: args,
    categories: args,
  });

  //validation
  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({
      status: "error",
      message: value.error.message,
    });
  }
  next();
};
