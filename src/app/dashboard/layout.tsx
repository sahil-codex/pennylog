"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
    children,}:{children:React.ReactNode;}){
      const pathname = usePathname();
        return (
            <div className="flex min-h-screen bg-gray-100">
                <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-8">PennyLog</h1>
                        <nav className="flex flex-col gap-2">
                            <Link href="/dashboard" className={`flex items-center gap-2 p-2 rounded-lg ${pathname === "/dashboard" ? "bg-gray-200 text-black font-semibold" : "text-gray-700 hover:bg-gray-100"}`}>📊 Dashboard </Link>
                              <Link href="/dashboard/transactions" className={`flex items-center gap-2 p-2 rounded-lg ${ pathname.startsWith("/dashboard/transactions")?"bg-gray-200 text-black font-semibold":"text-gray-700 hover:bg-gray-200"}`}>
                                 💸 Transactions</Link>
                        </nav>
                    </div>
                   <button className="text-red-500 hover:underline">Logout</button>
                </aside>
                <main className="flex-1 p-8">{children}</main>
            </div>
        );
    }