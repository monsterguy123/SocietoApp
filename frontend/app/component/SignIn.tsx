"use client"
import Link from "next/link"
import Image from "next/image";
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignInComponent() {

    const router = useRouter();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

   const SubmitHandler = async(e:any)=>{
        e.preventDefault();
        const url = "http://localhost:5000/api/v1/everyoneSignin";
        const res = await axios.post(url,{
            email,
            password
        })
        if(res.statusText === "OK"){
            localStorage.setItem("token",res.data.token);
            if(res.data.Role === "member"){
                router.push('/member')
            }else if(res.data.Role === "secretary"){
                router.push('/secretary')
            }
            setEmail('');
            setPassword('');
        }
   }

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <Image
                        alt="#"
                        width={500}
                        height={500}
                        src="https://soci101.org/_images/REALWORLD7_FIG03_CO.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-blue-600" href="#">
                            <span className="sr-only">Home</span>
                            <Image alt="#" width={70} height={70} src="https://appsnstuff.com/img/portfolio_images/devices/socity-management/socity-management-logo.png" />
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            SOCIETO APP
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            Join the Community, Manage with Ease: Sign in to Societo – Your Society&apos;s Digital Hub!
                        </p>

                        <form onSubmit={SubmitHandler} className="mt-8 grid grid-cols-6 gap-6">

                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    value={email}
                                    onChange={(e)=> setEmail(e.target.value)}
                                    className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="col-span-6 ">
                                <label className="block text-sm font-medium h-8 text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="items-center col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-1 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Sign In
                                </button>

                                <div className="flex mt-4 text-sm text-gray-500 sm:mt-0">
                                    Are you a member and don&apos;t have an account?
                                    <Link href={'/signup'}>
                                        <p className="text-gray-700 underline ml-1">Sign Up</p>.
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}
