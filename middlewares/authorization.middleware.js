import {verifyAccessJWT} from "../helpers/jwt.helper.js"

import {getAccessJWTByToken} from "../models/session/Session.model.js"
import { getUserById } from "../models/user/User.model.js";




const getUserSession = (accessJWT) => {
  return new Promise(async (resolve, reject) => {
    const sessionInfo = await getAccessJWTByToken(accessJWT);
    resolve(sessionInfo);
  });
};


   



export const userAuthorization= async (req,res,next)=>{
    try {
        const {authorization}=req.headers
        const verifyToken =  await verifyAccessJWT(authorization);


       if(!verifyToken?.email)  { 
         return res.status(403).json({
         status:"error",
            message:"unauthorized"
        })}
        // check if token exist in database
          const info =await getUserSession(authorization)
        
        if (info.user_id)
        req.body._id=info.userId

        // check and make sure the role is admin 
        // lets get the user by 
       const user = await getUserById(info.userId)
       id (user.role == "Admin")
        return   next()
       
    } catch (error) {
      res.status(403).json({
			status: "error",
			message: "Unauthorized",
		}  
      )
    }
}