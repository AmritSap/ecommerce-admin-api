import ResetSchema from "./ResetPin.Schema.js";

export const storeNewPin = async (newObj) => {
  console.log("from here", newSession);
  try {
    const result = await ResetSchema(newObj).save();
    return result;
  } catch (error) {
    reject(error);
  }
};


