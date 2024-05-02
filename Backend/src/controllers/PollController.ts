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

export const CreatePoll = async (req: Request, res: Response) => {
   try {
       const pollData: { title: string, options: string[] } = req.body;

       // Validate pollData
       // ...

       // Check if there's already a poll created by the admin
       const existingPoll = await prisma.poll.findFirst({
           where: { AdminId: req.adminId },
           select: { id: true }
       });

       if (existingPoll) {
           return res.json({ msg: "One poll at a time. To create another, delete the previous one." });
       }

       // Create a new poll
       let society = req.society || "";
       const createdPoll = await prisma.poll.create({
           data: {
               title: pollData.title,
               options: pollData.options,
               society: society,
               AdminId: req.adminId || "",
           },
           select: { id: true }
       });

       // Create options for the newly created poll in the voted table
       const options = pollData.options.map(option => {
           return { option: option, PollId: createdPoll.id };
       });

       const createdOptions = await prisma.voted.createMany({
           data: options
       });

       if (createdPoll && createdOptions) {
           return res.json({ msg: "Poll has been created successfully!" });
       }
   } catch (error: any) {
       return res.json({ msg: error.message });
   }
}


//Getting a Poll for user
export const GetAPoll = async(req:Request,res:Response)=>{
     try {
        let society = req.society || "";

       const Poll = await prisma.poll.findMany({
          where:{society},
          select:{
            title:true,
            options:true,
            id:true
          }
        });

      
        if(Poll){
          return res.json({Poll})
        }
     }catch(error:any) {
        return res.json({msg:error.message})
     }
}

//select a option in the poll
export const submitPoll = async(req:Request,res:Response)=>{
   try {
       const selectedOption:{option:string} = req.body;
       const pollId = req.params.pollId;

       //validation       

       //Already submiited a pole
       const AlreadySubmitted = await prisma.poll.findFirst({
            where:{
               id:pollId
            },
            select:{
               userVoted:{
                   where:{id:req.userId},
                   select:{id:true}                 
               }
            }       
        })
       if(AlreadySubmitted?.userVoted.length !== 0){
          return res.json({msg:"already votted..."})
       }

       //vote count checking
       const MatchedOption = await prisma.voted.findFirst({
          where:{option:selectedOption.option , PollId:pollId}
       })
       let voteCount = MatchedOption?.vote || 0;
       voteCount++;

       //submit vote
       const result = await prisma.voted.update({
         data:{
            vote:voteCount,
         },
         where:{id:MatchedOption?.id}
       })
       const user = await prisma.poll.update({
         where:{
            id:pollId,
         },
         data:{
            userVoted:{
               connect:{
                  id:req.userId
               }
            }
         }
       })

       if(result && user){
         return res.json({
            msg:"voted successfully"
         })
       }
   } catch (error:any) {
       return res.json({msg:error.message})
   }
}

//get all polls and send the high voted:---
export const GetPolls = async(req:Request,res:Response)=>{
   try {
      
      const polls = await prisma.poll.findMany({
          where:{AdminId:req.adminId}
         ,select:{
             title:true,
             id:true,
             voted:{
                select:{
                    option:true,
                    vote:true,
                }
             }
         }
      })

      let TotalNoOfPeople = await prisma.user.findMany({
         where:{society:req.society,role:"member"},
         select:{
            id:true
         }
      })
      let Total:number = TotalNoOfPeople.length;

      if(polls){
         return res.json({polls,Total});
      }

   } catch (error:any) {
      return res.json({msg:error.message})
   }
}

// Remove a poll from PollModel
export const RemovePoll = async (req: Request, res: Response) => {
   try {
       const pollId = req.params.pollId;

       // Validate pollId
       if (!pollId) {
           return res.status(400).json({ error: 'Invalid pollId' });
       }

       await prisma.voted.deleteMany({
         where:{
            PollId:pollId
         }
       })

       await prisma.poll.delete({
         where:{id:pollId}
       })

       return res.json({ msg: "Poll deleted successfully" });
   } catch (error: any) {
       console.error("Error while deleting poll:", error);
       res.status(500).json({ error: "An error occurred while deleting the poll" });
   }
}
