import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/getCurrentUser";



export default async function DashboardLayout({
    children,}:{children:React.ReactNode;}){
     
      const user = await getCurrentUser();  
      return (
                <div className="flex min-h-screen bg-gray-100">
                 <Sidebar user={user} />
                <main className="flex-1 p-8">{children}</main>
                </div>
           
        );
    }