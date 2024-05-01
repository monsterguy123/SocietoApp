"use client"
import Link from "next/link"

export default function Sidebar() {
    return (
        <div className="flex h-screen flex-col justify-between bg-white">
            <div className="px-6 py-8">
                <ul className="mt-6 space-y-4">
                    <Link href={"/secretary"}><li className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Dashboard
                    </li></Link>
                    <Link href={"/secretary/poll"}><li  className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Send a Poll
                    </li></Link>
                    <Link href={"/secretary/donation"}><li  className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                        Ask Donation
                    </li></Link>
                    <Link href={"/secretary/complaints"}><li  className="block rounded-lg px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition duration-300 ease-in-out">
                         Complaints
                    </li></Link>
                </ul>
            </div>
        </div>

    )
}