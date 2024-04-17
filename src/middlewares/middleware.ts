import JWT,{JwtPayload} from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'


declare global {
    namespace Express {
      interface Request {
        adminId?: string; 
        society?:string;
        userId?:string;
      }
    }
  }

export const userMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const token = req.header('Authorization')?.replace('Bearer ','') || "";
        const decodedToken = JWT.verify(token, process.env.JWTPRIVATEKEY || "") as JwtPayload
 
        if(decodedToken){
            req.society = decodedToken.society;
            req.userId = decodedToken.id;
            next();
        }else{
            res.status(401).json({msg:"User authorization failed"});
        }

    } catch (error:any) {
        res.json({msg:error.message})
    }
}

export const AdminMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.header('Authorization')?.replace('Bearer ','') || "";

        const decodedToken = JWT.verify(token, process.env.JWTPRIVATEKEY || "") as JwtPayload
        
        if(decodedToken.role === "secretary"){
            req.adminId = decodedToken.id;
            next();
        }else{
            res.status(401).json({msg:"Admin authorization failed"});
        }

    } catch (error:any) {
        res.json({msg:error.message})
    }
}