import {Request,Response} from 'express'
import {userSchema,UserSchema,userSigninSchema,UserSigninSchema} from '../RoutesValidations/userValidation'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient();


// Creating user and admin
export const userSignup = async(req:Request,res:Response)=>{
    try {     
        const User:UserSchema = req.body; 
        const userValidation = userSchema.safeParse(User);
        
        if(userValidation.success === false){
            res.json({msg:"there is error in user req body plz resend the correct user details..."})
        };
        
        const AlreadyExists = await prisma.user.findFirst({
            where:{
                email:User.email
            },
            select:{
                id:true
            }
        });
        
        if(AlreadyExists && AlreadyExists!=null){
              res.json({msg:"user already exists"});
        }
         
        //creating hashPassword
        const SALT = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(User.password,SALT);
 
        //Little modefication to insure the society matches
        let society = User.society.replace(/\s/g,"");
        society = society.toLowerCase();

        const role:any = User.role || "";
        
        //Create user
        const data = await prisma.user.create({
            data:{
                name:User.name,
                email:User.email,
                password:hashPassword,
                society,
                role,
                FlatNo:User.FlatNo
            }
        });

        res.status(200).json({msg:"user has been created successfully!!!"})

    } catch (error:any) {
        res.json({msg:error.message});
    }
}


// User and Admin Signin
export const userSignin = async(req:Request,res:Response)=>{
    try {
        
         const User = req.body;
         const userValidation = userSigninSchema.safeParse(User);


         if(userValidation.success === false){
              res.status(401).json({msg:"error in either email or password!!!"});
         }

         //Checking user in database
         const ExistingUser = await prisma.user.findUnique({where:{email:User.email}});
         
         if(!ExistingUser){
             res.status(401).json({msg:"user doesnot exist plz try signing up..."});
         }
         //comparing the two passwords
         const compare = await bcrypt.compare(User.password,ExistingUser!.password)
          if(!compare){
               res.status(401).json({msg:"wrong password..."})  
          }
         //creating token
         const secret = process.env.JWTPRIVATEKEY ||"";
         const token = jwt.sign({id:ExistingUser!.id,role:ExistingUser?.role,society:ExistingUser?.society},secret,{
            expiresIn:'4d'
         });

         if(token){
            res.status(200).json({token});
         }

    } catch (error:any) {
        res.json({msg:error.message});
    }
}