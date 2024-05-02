import { PrismaClient } from "@prisma/client";
import bcrypt, { hash } from 'bcrypt'

const prisma = new PrismaClient();

const main = async ()=>{

     const password = "Deepak@123"
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password,salt)

     await prisma.user.create({
        data:{
            name:"Deepak Bisht",
            email:"deepakbisht9891@gmail.com",
            password:hashPassword,
            society:"",
            FlatNo:"",
            PhoneNo:"",
            role:"superAdmin"
        }
     })
     
     await prisma.user.create({
        data:{
            name:"Kunal Chandeal",
            email:"Kunal@gmail.com",
            password:hashPassword,
            society:"thegokuldhamsociety",
            FlatNo:"B/23",
            PhoneNo:"8856473829",
            role:"member"
        }
     })

     await prisma.user.create({
        data:{
            name:"Abhey rai",
            email:"Abhay@gmail.com",
            password:hashPassword,
            society:"thegokuldhamsociety",
            FlatNo:"B/34",
            PhoneNo:"7865983423",
            role:"secretary"
        }
     })
}

main();