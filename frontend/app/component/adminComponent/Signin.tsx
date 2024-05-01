"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Signin() {
    
    const router = useRouter()
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')

    const SubmitHandler = async(e:any)=>{
            e.preventDefault();
            const url = "http://localhost:5000/api/v1/everyoneSignin"
            const res = await axios.post(url,{
                email,
                password
            })
            if(res){
                localStorage.setItem("token",res.data.token);
                console.log(res.data);
            }
            if(res.data.Role === "superAdmin"){
                router.push('/admin')
                setEmail("");
                setPassword("");
            }
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white w-96 dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-8 dark:text-gray-200">Welcome Back Super Admin!</h1>
                    <form onSubmit={SubmitHandler} action="#">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Admin Email..." required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Admin Password..." required />
                        </div>
                        <button  type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                    </form>
            </div>
        </div>
        </div >
    )
}