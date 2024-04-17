import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
declare global {
     namespace Express {
       interface Request {
         adminId?: string; 
         society?:string;
         userId?:string;
       }
     }
}

const prisma = new PrismaClient();

export const CreatePoll = async (req:Request,res:Response)=>{
     try {
        const Poll:{title:string , options:string[] ,society:string} = req.body;

        //validation

        
        let society = Poll.society.replace(/\s/g,"");
        society = society.toLowerCase();

        //creating a poll
        const result = await prisma.poll.create({
            data:{
               title:Poll.title,
               options:Poll.options,
               society:society,
               AdminId:req.adminId||""
            },
            select:{
               id:true
            }
        });

       //creating options after poll creation in the voted db
       const option = Poll.options.map(item =>{
          return {option:item , PollId:result.id};
       })
       const createVote = await prisma.voted.createMany({
         data:option
       })

        if(result && createVote){
            res.json({msg:"Poll has been created successfully!!!!"});
        }

     } catch (error:any) {
        res.json({msg:error.message});
     }
}

//Getting a Poll
export const GetAPoll = async(req:Request,res:Response)=>{
     try {
        let society = req.society || "";

        const Poll = await prisma.poll.findMany({
          where:{society}
        });
        
        if(Poll){
          res.json({Poll})
        }
     }catch(error:any) {
        res.json({msg:error.message})
     }
}

//select a option in the poll
export const submitPoll = async(req:Request,res:Response)=>{
   try {
       const selectedOption:{option:string} = req.body;
       const pollId = req.params.pollId;

       //validation
       

       //Already submiited a pole
       const AlreadySubmitted = await prisma.voted.findFirst({
            where:{
               PollId:pollId,
            },       
            select:{
               user:{
                  where:{id:req.userId},
                  select:{id:true}
               }
            }
        })
         
       if(AlreadySubmitted?.user){
          res.json({msg:"already votted..."})
       }

       //vote count checking
       console.log(pollId)
       const MatchedOption = await prisma.voted.findFirst({
          where:{option:selectedOption.option , PollId:pollId}
       })
       console.log(MatchedOption);
       let voteCount = MatchedOption?.vote || 0;
       voteCount++;

       //submit vote
       const result = await prisma.voted.update({
         data:{
            vote:voteCount,
         },
         where:{id:MatchedOption?.id}
       })
       if(result){
         res.json({
            msg:"voted successfully"
         })
       }
   } catch (error:any) {
       res.json({msg:error.message})
   }
}