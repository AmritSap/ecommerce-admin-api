import { ProdSchema } from "./Product.Schema.js";

export const insertProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema(data).save();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProduct = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProductById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findById(_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProductById = ({_id,formDt}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findByIdAndUpdate({_id},
        {
        $set: formDt
      },
      {
        new:true,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteProduct = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ProdSchema.findByIdAndDelete(_id);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
