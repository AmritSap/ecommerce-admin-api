import { AdminUsers } from "./User.schema.js";

export const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((eror) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};


export const getUserByEmailPass = ({ email, password }) => {
  console.log(email, password);
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOne({ email, password })
        .then((data) => {
          return resolve(data);
        })
        .catch((eror) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
