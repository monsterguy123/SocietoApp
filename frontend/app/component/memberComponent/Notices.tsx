"use client"
import axios from 'axios'
import { headers } from 'next/headers'
import { useEffect, useState } from 'react'

type Result = {
    title: string,
    action: string,
    issue: string,
    request: string,
    understood:string,
    id:string

}

export default function Notices() {
    const [result, setResult] = useState<Result[]>([]);

    const SubmitHandler = async (id: string) => {
        const token = localStorage.getItem('token');
        const url = `http://localhost:5000/api/v1/notice/understood/${id}`;
        try {
            const res = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data) {
                console.log(res);
                alert("Understood");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect((): any => {
        return async () => {
            const url = 'http://localhost:5000/api/v1/notice/myNotice';
            const token = localStorage.getItem('token');
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res) {
                setResult(res.data.notices)
            }
        }
    }, [SubmitHandler])
    

    return (
        <div>
            <h1 className='text-center mt-10 text-4xl font-serif'>Complaint Notice From Secretary</h1>
            {
                result.map((item, key) => {
                    return (
                        <div key={key} className='bg-white w-[70%] shadow-md shadow-gray-400 rounded px-8 pt-6 pb-8 mt-10 ml-32 items-center flex flex-col my-2 "'>
                            <p className='text-xl underline font-serif'>{item.title}</p>
                            <p className='text-lg font-serif text-center'>Description : {item.issue}</p>
                            <p className='text-lg font-serif'>Request : {item.request}</p>
                            <p className='text-lg font-serif'>Action : {item.action}</p>
                            
                            {
                                (item.understood)?<p className='text-xl mt-5 font-bold'>Already Submitted</p>:

                            <button
                               onClick={()=>SubmitHandler(item.id)}
                                className="group relative inline-block mt-5 focus:outline-none focus:ring"
                            >
                                <span className="rounded-md absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                               <span className="rounded-md relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                                    Understood
                                </span>
                            </button>
                }
                        </div>
                    )
                })
            }
        </div>
    )
}