"use client"
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Result = {
    title: string,
    id:string,
    description: string,
    impact: string,
    requestedAction: string,
    EvidenceImg: string,
    culpritFlatno: string,
    isResolved:string
}

export default function Complaints() {
    const [result, setResult] = useState<Result[]>([]);

    useEffect((): any => {
        return async () => {
            const url = 'http://localhost:5000/api/v1/complaint/allComplaint';
            const token = localStorage.getItem('token');
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res) {
                setResult(res.data.complaints)
            }
        }
    }, [])

    return (
        <div>
            <h1 className='text-center mt-10 text-4xl font-serif'>Complaints From Users</h1>
            {
                result.map((item, key) => {
                    return (
                        <div key={key} className='bg-white w-[70%] shadow-md shadow-gray-400 rounded px-8 pt-6 pb-8 mt-10 ml-32 items-center flex flex-col my-2 "'>
                            <p className='text-xl underline font-serif'>{item.title}</p>
                            <p className='text-lg font-serif text-center'>Description : {item.description}</p>
                            <p className='text-lg font-serif'>Impact : {item.impact}</p>
                            <p className='text-lg font-serif'>Request Action : {item.requestedAction}</p>
                            <p className='text-lg font-serif'>CulpritFlatNo : {item.culpritFlatno}</p>
                            {
                                (item.isResolved)?<p className='text-2xl font-bold mt-5'>Issue Resolved</p>:

                            <button
                                type="submit"
                                className="group relative inline-block mt-5 focus:outline-none focus:ring"
                            >
                                <span className="rounded-md absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                               <Link href={`/secretary/notice/${item.id}`}><span className="rounded-md relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                                    SEND NOTICE
                                </span></Link>
                            </button>
                }
                        </div>
                    )
                })
            }
        </div>
    )
}