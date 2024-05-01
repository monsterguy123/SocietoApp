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
}

main();