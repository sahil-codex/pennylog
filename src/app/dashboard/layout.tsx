import Link from "next/link";

export default function DashboardLayout({
    children,}:{children:React.ReactNode;}){
      
        return (
            <div className="flex min-h-screen bg-gray-100">
                <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-8">PennyLog</h1>
                        <nav className="flex flex-col gap-4">
                            <Link href="/dashboard" className="text-gray-700 hover:text-black">
                              📊  Dashboard</Link>
                              <Link href="/dashboard/transactions" className="text-gray-700 hover:text-black">
                                 💸 Transactions</Link>
                        </nav>
                    </div>
                   <button className="text-red-500 hover:underline">Logout</button>
                </aside>
                <main className="flex-1 p-8">{children}</main>
            </div>
        );
    }