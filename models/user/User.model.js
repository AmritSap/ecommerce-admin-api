import { AdminUsers } from "./User.schema.js";

export const createUser = (userObj) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers(userObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserByEmail = (email) => {
 
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOne({ email})
        .then((data) => {
           resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
export const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findById( _id )
        .then((data) => {
           resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};



export const storeRefreshJWT = (_id,token) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserByEmailAndRefeshJWT = ({email,refreshJWT}) => {
  // console.log(email, refreshJWT);
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOne({ email, "refreshJWT.token": refreshJWT })
        .then((data) => {
          return resolve(data);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export const deleteRefreshJwtByUserId = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOneAndUpdate(
        { _id },
        {
          $set: { "refreshJWT.token": " ", "refreshJWT.addedAt": Date.now() },
        },
        { new: true }
      )
        .then((data) => console.log(data))
        .catch((error) => error);
      
    } catch (error) {
      reject(error);
    }
  });
};


export const updateNewPassword = ({ email, hashPass }) => {
  return new Promise((resolve, reject) => {
    try {
      AdminUsers.findOneAndUpdate(
        { email },
        {
          $set:{password:hashPass},
        },
        { new: true }
      )
        .then((data) => console.log(data))
        .catch((error) => error);
    } catch (error) {
      reject(error);
    }
  });
};