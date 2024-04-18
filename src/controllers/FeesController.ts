import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

declare global {
    namespace Express {
      interface Request {
        adminId?: string; 
        userId?:string;
      }
    }
}


export const CreateFees= async(req:Request,res:Response)=>{
    try {
        const fees:{title:string , amount:number ,startDate:Date, endDate:Date} = req.body;
        const AdminId = req.adminId || "";
        //validation

        //createFees
        const feeCreated = await prisma.fees.create({
            data:{
                title:fees.title,
                amount:fees.amount,
                startDate:fees.startDate,
                endDate:fees.endDate,
                AdminId,
            }
        })

        if(feeCreated){
            res.json({msg:"Fees Created Successfully..."})
        }

    } catch (error:any) {
        res.json({msg:error.message});
    }
}