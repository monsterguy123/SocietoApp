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
        //Create userSubmitted 
        const userSubmitted = await prisma.userSubmitted.create({
            data:{
                FeeId:feeCreated.id,
            }
        })

        if(feeCreated && userSubmitted){
            res.json({msg:"Fees Created Successfully..."});
        }

    } catch (error:any) {
        res.json({msg:error.message});
    }
}


export const SubmitFees = async(req:Request,res:Response)=>{
    try {
        const feeSubmit:{amount:string} = req.body;
        const feeId = req.params.feeId;
        const userId = req.userId;

        //checking if user already submitted
        const AlreadySubmitted = await prisma.userSubmitted.findFirst({
            where:{
                FeeId:feeId
            },
            select:{
                id:true,
                user_Submitter:{
                    where:{id:userId},
                    select:{id:true}
                }
            }
        })
        
         if(AlreadySubmitted?.user_Submitter.length != 0){
              res.json({msg:"already submitted"});
         }
 
        //Submitting the amount:--
         const submitted = await prisma.userSubmitted.update({
              where:{id:AlreadySubmitted?.id},
              data:{
                 user_Submitter:{
                    connect:{id:userId}
                 }
              }
         })

         if(submitted){
            res.json({msg:"fees submitted successfully..."});
         }

    } catch (error:any) {
        console.log(error.message);
    }
}