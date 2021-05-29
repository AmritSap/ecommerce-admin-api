import ResetSchema from "./ResetPin.Schema.js";

export const storeNewPin = async (newObj) => {
  
  try {
    const result = await ResetSchema(newObj).save();
    return result;
  } catch (error) {
    reject(error);
  }
};

export const findNewPin =  ({otp,password}) => {
  return new Promise (async(resolve,reject)=>{ try {
    const result = await ResetSchema.findOne({ otp, password });
    resolve (result);
  } catch (error) {
    reject(error);
  }})
 
};

export const deletePasswordResetPin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await ResetSchema.findByIdAndDelete(_id);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};


