"use client"
import Link from "next/link"

export default function SignUpComponent() {
    return (
        <section className="bg-white dark:bg-gray-900">
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
                             Revolutionize your community cohesion with the groove of our Societo app - where neighborly vibes meet digital delights!
                        </p>

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                            
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700"> User's Name </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 w-full rounded-md border-black bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div> 
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    type="email"
                                    id="Email"
                                    name="email"
                                    className="mt-1 w-full rounded-md b bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="col-span-3 ">
                                <label className="block text-sm font-medium h-8 text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>
                            <div className="col-span-6">
                                <label className="block text-sm font-medium text-gray-700"> Society Name</label>

                                <input
                                    type="text"
                                    id="society"
                                    name="society"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700"> Role</label>

                                <select className="mt-1 w-full " name="Role" id="role">
                                    <option>secretary</option>
                                    <option>member</option>
                                </select>
                            </div>
                            <div className="col-span-3">
                                <label className="block text-sm font-medium text-gray-700"> Flat No </label>

                                <input
                                    type="text"
                                    id="FlatNo"
                                    name="FlatNo"
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm h-8"
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <Link href={'/signin'}>
                                       <span className="text-gray-700 underline ml-1">Log in</span>.
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}
