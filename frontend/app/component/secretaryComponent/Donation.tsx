export default function Donation(){
    return(
        <div className="container mx-auto h-screen overflow-y-auto w-[80%]">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            title
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Title..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Amount
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="number" placeholder="Issue..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Start Date
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="Date" placeholder="Request..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            End Date
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="Date" placeholder="Action..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6 justify-center">
                    <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                        <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                            Ask for Donation
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}