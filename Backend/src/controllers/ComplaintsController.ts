import {Request,Response} from 'express'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

declare global {
    namespace Express {
      interface Request {
        adminId?: string; 
        userId?:string;
        society?:string;
      }
    }
}


export const CreateComplaint = async(req:Request,res:Response)=>{
    try {
        const Complaint:{culpritFlatno:string, title:string , description:string , impact:string ,requestedAction:string ,EvidenceImg?:string} = req.body; 

        //validation

        //create a complaint
        const CreateComplaint = await prisma.complaintRequest.create({
              data:{
                  title:Complaint.title||"",
                  description:Complaint.description||"",
                  impact:Complaint.impact||"",
                  requestedAction:Complaint.requestedAction||"",
                  EvidenceImg:Complaint.EvidenceImg||"",
                  userId:req.userId||"",
                  culpritFlatno:Complaint.culpritFlatno||""
              }
        });

        if(CreateComplaint){
           return res.json({msg:"Complaint has been logged..."});
        }

    } catch (error:any) {
        return res.json({msg:error.message});
    }
}


export const myCompaint = async(req:Request,res:Response)=>{
    try {
        
        //fetching user's complaint
        const myComplaint = await prisma.complaintRequest.findUnique({
            where:{id:req.userId}
        })

        return res.json({myComplaint});
    } catch (error:any) {
        return res.json({msg:error.message});
    }
}

export const getAllComplaint = async(req:any,res:Response)=>{
    try {
        

        //getting all complaint for admin
         const complaints = await prisma.complaintRequest.findMany({
            where:{
                user:{
                    society:{equals:req.society}
                }
            }
         })

          if(complaints){
            return res.json({complaints})
          }

    } catch (error:any) {
        return res.json({msg:error.message});
    }
}