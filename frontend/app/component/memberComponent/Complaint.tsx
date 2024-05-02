"use client"
import axios from 'axios'
import {useState} from 'react'

export default function Complaint() {
    
    const [title,setTitle] = useState<string>('')
    const [culpritFlatno,setculpritFlatno] = useState<string>('')
    const [description,setDescription] = useState<string>('')
    const [impact,setImpact] = useState<string>('')
    const [requestedAction,setRequestedAction] = useState<string>('')
    const [EvidenceImg,setEvidenceImg] = useState<string>('')


    const SubmitHandler = async (e: any) => {
        e.preventDefault();
    
        const url = "http://localhost:5000/api/v1/complaint/createComplaint";
        const token = localStorage.getItem('token');
    
        try {
            const res = await axios.post(url, {
                title,
                description,
                impact,
                requestedAction,
                EvidenceImg,
                culpritFlatno
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (res.statusText === "OK") {
                alert(res.data.msg)
                setTitle("");
                setDescription("");
                setEvidenceImg("");
                setImpact("");
                setRequestedAction("");
                setculpritFlatno("");
            } else {
                console.log("Error:", res.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    return (
        <div className="container mx-auto h-screen overflow-y-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
            <form onSubmit={SubmitHandler}>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Title
                        </label>
                        <input onChange={(e)=>setTitle(e.target.value)} value={title} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Title..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Description
                        </label>
                        <input onChange={(e)=>setDescription(e.target.value)} value={description} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Description..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Impact
                        </label>
                        <input onChange={(e)=>setImpact(e.target.value)} value={impact} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Impact..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            RequestedAction
                        </label>
                        <input onChange={(e)=>setRequestedAction(e.target.value)} value={requestedAction} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Action..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Culpirt&apos;s Room no
                        </label>
                        <input onChange={(e)=>setculpritFlatno(e.target.value)} value={culpritFlatno} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Room no..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6 justify-center">
                    <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                        <button type='submit' className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                            File Complaint
                        </button>
                    </a>
                </div>
            </form>
            </div>
        </div>
    )
}
