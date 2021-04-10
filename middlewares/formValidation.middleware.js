import joi from "joi";

const email = joi.string().min(3).max(50).required();
const password = joi.string().required();
export const loginVidation = (req, res, next) => {
  const schema = joi.object({ email, password });

  //validation
  const value = schema.validate(req.body);
  console.log(value);

  if (value.error) {
    return res.json({
      status: "error",
      message:value.error.message,
    });
  }
  next();
};
