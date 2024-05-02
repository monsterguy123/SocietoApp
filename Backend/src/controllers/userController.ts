import {Request,Response, application} from 'express'
import {userSchema,UserSchema,userSigninSchema,UserSigninSchema} from '../RoutesValidations/userValidation'
import { PrismaClient, Role } from '@prisma/client';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const nodemailer = require('nodemailer')
const prisma = new PrismaClient();


//Creating Members
export const memberSignup = async(req:Request,res:Response)=>{
    try {    
        const User:UserSchema = req.body; 
        const userValidation = userSchema.safeParse(User);
        
        if(userValidation.success === false){
            res.json({userValidation})
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

        const role = "member";
        
        //Create user
        const data = await prisma.user.create({
            data:{
                name:User.name,
                email:User.email,
                password:hashPassword,
                society,
                role,
                FlatNo:User.FlatNo,
                PhoneNo:User.PhoneNo
            }
        });

        res.status(200).json({msg:"user has been created successfully!!!"})

    } catch (error:any) {
        res.json({msg:error.message});
    }
}


// Member ,Secretary and SuperAdmin Signin
export const Signin = async(req:Request,res:Response)=>{
    try {
         const User = req.body;
         const userValidation = userSigninSchema.safeParse(User);

         if(userValidation.success === false){
             return res.status(401).json({msg:"error in either email or password!!!"});
         }

         //Checking user in database
         const ExistingUser = await prisma.user.findUnique({where:{email:User.email}});
         
         if(!ExistingUser){
             return res.status(401).json({msg:"user doesnot exist plz try signing up..."});
         }
         //comparing the two passwords
         const compare = await bcrypt.compare(User.password,ExistingUser!.password)
          if(!compare){
               return res.status(401).json({msg:"wrong password..."})  
          }
         //creating token
         const secret = process.env.JWTPRIVATEKEY ||"";
         const token = jwt.sign({id:ExistingUser!.id,role:ExistingUser?.role,society:ExistingUser?.society},secret,{
            expiresIn:'4d'
         });

         if(token){
            return res.status(200).json({token,Role:ExistingUser?.role});
         }

    } catch (error:any) {
         return res.json({msg:error.message});
    }
}

//Application for creating Secretary  
export const SecretaryApplication = async (req:Request,res:Response)=>{
    try {
        const Application:{society:string,name:string,email:string,phoneNo:string,Message?:string} = req.body;
        //validation
        
        //send secretary password and email to his email
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        
        

         const info =  await transporter.sendMail({
            from: Application.email,
            to: process.env.USER,
            subject: "Application For Secretary Creation...", 
            text: `HELLO FROM SECRETARY OF THE SOCIETY ${Application.society}`, 
            html: `<b>Name : ${Application.name}</b>
            <br/>
              <b>Email : ${Application.email}<b>
              <br/>
              <b>Phone No : ${Application.phoneNo}</b>
              <br/>
              <b>${Application.Message}</b>
            `, 
          }
        );

        //response
        if(info){
            return res.json({msg:"Aplplication is created Successfully..."});
        }

    } catch (error:any) {
        return res.json({msg:error.message})
    }
}

//Creating Secretary...
export const CreatingSecretary = async(req:Request,res:Response)=>{
    try {
        
        const Secretary:{name:string , email:string, society:string,phoneNo:string} = req.body;
        //validation

        //creating hashPassword
        function generateRandomPassword(length:number) {
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let password = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                password += charset[randomIndex];
            }
            return password;
        }
        const password = generateRandomPassword(12);
        const SALT = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,SALT);
 
        //Little modefication to insure the society matches
        let society = Secretary.society.replace(/\s/g,"");
        society = society.toLowerCase();


        //create Sceretary
         const secreSociety = await prisma.user.create({
            data:{
                name:Secretary.name,
                email:Secretary.email,
                password:hashPassword,
                PhoneNo:Secretary.phoneNo,
                society:society,
                role:"secretary"
            }
         })
 
         //send secretary password and email to his email
         const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        

         const info =  await transporter.sendMail({
            from: "SocietoAppAdmin@gmail.com",
            to: secreSociety.email,
            subject: "YOUR EMAIL ID AND TEMPORARY PASSWORD...", 
            text: `HELLO SECRETARY OF THE SOCIETY ${Secretary.society}`, 
            html: `<b>email : ${secreSociety.email}</b>
              <b>password : ${password}<b>
            `, 
          }
        );


          if(info && secreSociety){
            return res.json({msg:"created user and send email and password to the secretart of the specified society"});
          }

    } catch (error:any) {
         return res.json({msg:error.message});
    }
}

//get all secretary 
export const getAllSecretary = async(req:Request,res:Response)=>{
    try {
        const Secretary = await prisma.user.findMany({
            where:{
                role:"secretary"
            }
        })

        if(Secretary){
            return res.json({Secretary})
        }
    } catch (error:any) {
        return res.json({msg:error.message});
    }
}

//get all members of a society
export const SocietyMembers = async(req:Request,res:Response)=>{
    try {
        const members = await prisma.user.findMany({
            where:{
                society:req.society,
                role:{equals:"member"}
            },
            select:{
                name:true,
                email:true,
                PhoneNo:true,
                FlatNo:true
            }
        })
        
        if(members){
            return res.json({members})
        }
    } catch (error:any) {
        return res.json({msg:error.message})
    }
}