import jwt from "jsonwebtoken";
import {storeAccessJwt} from "../models/session/Session.model.js"
import {storeRefreshJWT} from "../models/user/User.model.js"

 export const createAcessJWT=   (email,_id)  =>
{
    return new Promise ( async (resolve,reject)=>{
        try {
              const accessJWT = await jwt.sign(
                { email },
                process.env.JWT_ACCESS_SECRET,
                {
                  expiresIn: "15m",
                }
              );
              if (accessJWT) {
                const newSession = {
                  accessJWT,
                  userId: _id,
                };
                 storeAccessJwt(newSession);
              }
resolve (accessJWT)
    // store in databasase
        } catch (error) {
            reject(error)
        }
    })
  

}

export const createRefreshJWT=(email,_id)=>{
    return new Promise(async(resolve,reject)=>{
try {
    const refreshJWT = await jwt.sign({email},process.env.JWT_REFRESH_SECRET,{
        expiresIn:"30d"
    })
    storeRefreshJWT(_id,refreshJWT)
    resolve(refreshJWT);
} catch (error) {
    reject(error)
}
    })
}


export const verifyAccessJWT =accessJWT => {
    try {
        const decoded = jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
       return Promise.resolve(decoded);
        
    } catch (error) {
        return Promise.resolve(false)
    }
}

export const verifyRefreshJWT = (refreshJWT) => {
  try {
    const decoded = jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
    return Promise.resolve(decoded);
  } catch (error) {
    return Promise.reject(false);
  }
};