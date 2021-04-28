import {verifyAccessJWT} from "../helpers/jwt.helper.js"

import {getAccessJWTByToken} from "../models/session/Session.model.js"




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
          next()
       
    } catch (error) {
      res.status(403).json({
			status: "error",
			message: "Unauthorized",
		}  
      )
    }
}