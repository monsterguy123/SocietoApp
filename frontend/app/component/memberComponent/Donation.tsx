"use client"
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Donation from '../secretaryComponent/Donation'

type Result = {
    title: string,
    id:string,
    startDate:string,
    endDate:String,
}

export default function Doantions() {
    const [result, setResult] = useState<Result[]>([]);
    const [donation , setDonation] = useState<string>('')

    useEffect((): any => {
        return async () => {
            const url = 'http://localhost:5000/api/v1/fee/getDonations';
            const token = localStorage.getItem('token');
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res) {
                setResult(res.data.Doantions)
            }
        }
    }, [])

    const submitHandler = async(e:any,id:string)=>{
             e.preventDefault();
             const token = localStorage.getItem('token');
             const url = `http://localhost:5000/api/v1/fee/donationSubmitted/${id}`
             const dona = parseInt(donation);
             
             const res = await axios.post(url,{
                  dona
             },{
                 headers:{
                    Authorization:`Bearer ${token}`
                 }
             })

             if(res.statusText === "OK"){
                alert(res.data.msg)
                setDonation('')
             }
    }

    return (
        <div className="flex justify-center">
    <div className="flex flex-col items-center">
        <h1 className="text-center mt-10 text-4xl font-serif">Donation for the society welfare</h1>
        {result.map((item, key) => (
            <div key={key} className="bg-white w-[100%]  ml-10 shadow-md shadow-gray-400 rounded-md px-8 pt-6 pb-8 mt-10 items-center flex flex-col my-2">
                <p className="text-2xl underline font-bold">{item.title}</p>
                <p className="text-xl mt-5 font-serif text-center">Donation as much as you can afford to give...</p>
                <p className="text-xl font-serif">StartAt : {item.startDate}</p>
                <p className="text-xl font-serif">EndAt : {item.endDate}</p>
                <form onSubmit={e => submitHandler(e,item.id)}>
                <input className="mt-5 appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type='number' onChange={(e:any) => setDonation(e.target.value)} value={donation}/>
                <button  type="submit" className="mt-5 focus:outline-none">
                        <span className="ml-5 group relative inline-block bg-yellow-300 px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-md transition-all duration-300 transform hover:translate-x-1 hover:translate-y-1">
                            Donate Plz
                        </span>
                </button>
                </form>
            </div>
        ))}
    </div>
</div>
    )
}