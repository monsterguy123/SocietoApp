import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav className="bg-gray-100 shadow shadow-white w-100 px-8 md:px-auto">
            <div className="md:h-16 h-28 ml-0 md:px-4 container flex items-center justify-between  flex-wrap md:flex-nowrap">
                <div className="text-indigo-500 flex  md:order-1">
                    <Image alt="#" className="h-10 w-10" src="https://appsnstuff.com/img/portfolio_images/devices/socity-management/socity-management-logo.png" />
                     <span className="ml-5 mt-1 text-2xl font-bold">SOCIETO APP</span>
                </div>
                <div className="order-2 md:order-3">
                    <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
                        <Link href={'/signin'}><span>Logout</span></Link>
                    </button>
                </div>
            </div>
        </nav>
    )
}