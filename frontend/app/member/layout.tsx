import Navbar from "../component/Navbar";
import Sidebar from "../component/memberComponent/Sidebar";

export default function SecretaryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="flex h-screen justify-center"> {/* Updated: Added justify-center class */}
                    <div className="w-[20%] h-full border-r-2 border-black">
                        <Sidebar />
                    </div>
                    <div className="w-[80%]">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
