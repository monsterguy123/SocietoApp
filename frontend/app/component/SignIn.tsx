"use client"
import Link from "next/link"

export default function SignInComponent() {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
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
                            <img className="h-20 w-20" src="https://appsnstuff.com/img/portfolio_images/devices/socity-management/socity-management-logo.png"/>
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            SOCIETO APP 
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                        Join the Community, Manage with Ease: Sign in to Societo – Your Society's Digital Hub!
                        </p>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                             
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="col-span-6 ">
                                <label className="block text-sm font-medium h-8 text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-1 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Sign In
                                </button>
                           
                                <div className="mt-4 text-sm flex text-gray-500 sm:mt-0">
                                    Don't have an account?
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
