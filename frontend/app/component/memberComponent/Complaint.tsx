export default function Complaint() {
    return (
        <div className="container mx-auto h-screen overflow-y-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 ">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Title..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Description
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Description..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Impact
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Impact..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            RequestedAction
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Action..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Culpirt's Room no
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="text" placeholder="Room no..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Evidencial Image
                        </label>
                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" type="file" placeholder="Evidences..." />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6 justify-center">
                    <a className="group relative inline-block focus:outline-none focus:ring" href="#">
                        <span className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></span>
                        <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest">
                            File Complaint
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
