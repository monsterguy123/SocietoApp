"use client"
import axios from 'axios';
import {useState} from 'react'
import { useRouter } from 'next/navigation';

export default function Notice({ids}:{ids:string}){
    
    const router = useRouter();
    const [title,setTitle] = useState<string>("");
    const [issue,setIssue] = useState<string>("");
    const [request,setRequest] = useState<string>("");
    const [action,setAction] = useState<string>("");
    const [culpritFlatno,setCulpritFlatno] = useState<string>("");

    const SubmitHandler = async(e:any)=>{
        e.preventDefault();
        const url = `http://localhost:5000/api/v1/notice/createNotice/${ids}`
        const token = localStorage.getItem('token')
        const res = await axios.post(url,{
            title,
            issue,
            request,
            action,
            culpritFlatno
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.data.msg === "notice has been created..."){
            router.push('/secretary/complaints')
            setTitle("")
            setIssue("")
            setRequest("")
            setAction("")
            setCulpritFlatno("")
        }
    }

    return(
        <div className="container mx-auto h-screen overflow-y-auto w-[80%]">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
                <form onSubmit={SubmitHandler}>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            title
                        </label>
                        <input onChange={(e)=>{setTitle(e.target.value)}} value={title} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Title..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            issue
                        </label>
                        <input onChange={(e)=>{setIssue(e.target.value)}} value={issue} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Issue..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Request
                        </label>
                        <input onChange={(e)=>{setRequest(e.target.value)}} value={request} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Request..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Action
                        </label>
                        <input onChange={(e)=>{setAction(e.target.value)}} value={action} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Action..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                           Culprit's Room No  
                        </label>
                        <input onChange={(e)=>{setCulpritFlatno(e.target.value)}} value={culpritFlatno} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Culpirt's room no..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6 justify-center">
                    <button type='submit' className="group relative inline-block focus:outline-none focus:ring" >
                        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                        <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                            Send Notice
                        </span>
                    </button>
                </div>
              </form>
            </div>
        </div>
    )
}