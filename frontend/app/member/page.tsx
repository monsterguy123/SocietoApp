"use client"
import { useState } from 'react';
import PollsViwer from '../component/memberComponent/Poll';
import FeeSubmitter from '../component/memberComponent/FeeSubmitter';

export default function Member() {

    const [change , setChange] = useState<string>("polls");

    return (
        <div className="h-screen">
            <div className="flex text-center">
                 <div onClick={()=>setChange("polls")} className="w-[50%] h-10 border-2 border-black text-lg">POLLS FOR SOCIETY</div>
                 <div onClick={()=>setChange("fees")} className="w-[50%] h-10 border-2 border-black text-lg">DONATION FOR SOCIETY</div>
            </div>
            <div className="w-[100%] h-full border-2 border-black">
                {
                    (change === "polls")?<PollsViwer/>:
                    (change === "fees")?<FeeSubmitter/>:null
                }
            </div>
        </div>
    )
}