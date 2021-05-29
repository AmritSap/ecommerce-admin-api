import SchemaSession from "./Session.schema.js";

export const storeAccessJwt = async (newSession) => {
  console.log("from here", newSession);
  try {
    const result = await SchemaSession(newSession).save();
    return result;
  } catch (error) {
    reject(error);
  }
};

export const getAccessJWTByToken = async (accessJWT) => {
  console.log("from model seession", accessJWT);
  return new Promise(async (resolve, reject) => {
    try {
      console.log("from model seession", accessJWT);
      const result = await SchemaSession.findOne({ accessJWT });
      console.log("from database", result);
      resolve(result);
    } catch (error) {
      resolve(false);
    }
  });
};

export const deleteAccessJwtByUserId = (userId) => {
  try {
    SchemaSession.findOneAndDelete(userId)
      .then((data) => {})
      .catch((error) => error);
  } catch (error) {
    console.log(error);
  }
};
