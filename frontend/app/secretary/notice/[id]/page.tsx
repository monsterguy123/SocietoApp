"use client"
import Notice from "@/app/component/secretaryComponent/Notice";
import { useParams } from "next/navigation";

export default function Notices(){
    const params = useParams()
    const id = params.id as string;

    return (
        <div>
            <div className="text-center text-4xl font-serif mt-5">Sending Complaint Notice To Culprit</div>
            <Notice ids={id}/>
        </div>
    )
}
