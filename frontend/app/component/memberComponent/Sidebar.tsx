"use client"
import Link from "next/link"

export default function Sidebar({setSidebar}:any) {

    return (
        <div className="flex h-screen flex-col justify-between bg-white">
            <div className="px-6 py-8">
                <ul className="mt-6 space-y-4">
                    <Link href={"/member"}><li className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Poll from Society
                    </li></Link>
                    <Link href={"/member/donation"}><li className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Donation
                    </li></Link>
                    <Link href={"/member/complaint"}><li  className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Log a Complaint
                    </li></Link>
                    <Link href={"/member/notice"}><li  className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Notice
                    </li></Link>
                </ul>
            </div>
        </div>

    )
}