import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
const prisma = new PrismaClient();

export const createNotice = async(req:Request,res:Response)=>{
      try {
        
        const Notice:{title:string , issue:string , request:string , action:string,culpritFlatno:string } = req.body;
        const complaintId = req.params.complaintId;

        //validation
        

         //getting culprit's id
         const culprit = await prisma.user.findFirst({
            where:{FlatNo:Notice?.culpritFlatno},
            select:{id:true}
         })

        
         //create Notice
         const noticeCreated = await prisma.complaintNotice.create({
            data:{
                title:Notice.title||"",
                issue:Notice.issue||"",
                request:Notice.request||"",
                action:Notice.action||"",
                AdminId:req.adminId||"",
                userId:culprit?.id||"",
                complaintId
            }
         })

          if(noticeCreated){
            res.json({msg:"notice has been created..."});
          }        
      } catch (error:any) {
          res.json({msg:error.message})
      }
}

export const myNotice = async(req:Request,res:Response)=>{
    try {
        //sending notices to culprit
        const notices = await prisma.complaintNotice.findMany({
            where:{
                userId:req.userId
            },
            select:{
                title:true,
                action:true,
                issue:true,
                request:true,
                understood:true,
                id:true
            }
        })

        if(notices){
            res.json({notices})
        }

    } catch (error:any) {
        res.json({msg:error.message});
    }
}

//Culprit understood
export const Culpritunderstood = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId;
        const noticeId = req.params.noticeId;

        //culprit understood:--
        const culprit = await prisma.complaintNotice.update({
            where:{id:noticeId},
            data:{
                understood:true
            },
            select:{
                understood:true,
                complaintId:true
            }
        })

        let resolved;
        if(culprit.understood){
            //changing the complaint to resolved:---
             resolved = await prisma.complaintRequest.update({
                where:{id:culprit.complaintId},
                data:{
                    isResolved:true,
                }
            })
        }

        
        if(resolved){
            res.json({msg:"complaint has been resolved successfully..."});
        }

    } catch (error:any) {
        res.json({msg:error.message})
    }
}