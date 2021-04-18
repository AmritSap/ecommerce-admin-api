import { CatSchema } from "./Category.Schema.js";

export const insertCategory = (catObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CatSchema(catObj).save();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
export const getCategories = (catObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CatSchema.find();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteCategories = (catArg) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await CatSchema.deleteMany({
        _id: { $in: catArg },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const editCategoryName = (update) => {
  const { _id, updatedName } = update;
  console.log(updatedName);

  return new Promise(async (resolve, reject) => {
    try {
      const result = await CatSchema.findByIdAndUpdate(_id, {
        $set: { name: updatedName },
      });
      console.log(result);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
