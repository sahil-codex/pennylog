import {redirect} from "next/navigation";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {getUserSummary} from "@/lib/summary";
import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TranactionsList";
import MonthlyChart from "@/components/MonthlyChart";


async function getSummary(userId:string){
    const summary = await getUserSummary(userId);
     return summary;
}
 export default async function Dashboard(){
  const user= await getCurrentUser();
   
  if(!user){
        redirect("/login");
    
    } 

    const summary =  await getSummary(user.userId);

  return (
    <div className="p-10">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
            Expense Dashboard
        </h1>

           <form action="/api/logout" method="POST">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Logout
          </button>
        </form>
        
      </div>
        <AddTransaction/>
        <div className="grid grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded">
                <h2 className="text-gray-500">Total Expenses</h2>
                <p className="text-2xl font-bold">
                    ${summary.total_expense}
                </p>
            </div>
        
            <div className="bg-white shadow p-6 rounded">
                <h2 className="text-gray-500">Transaction</h2>
                <p className="text-2xl font-bold">
                    {summary.transactions_count}
                </p>
            </div>
            <div className="bg-white shadow p-6 rounded">
                <h2 className="text-gray-500">This Month</h2>
                <p className="text-2xl font-bold">
                    ${summary.this_month_expense}
                </p>
            </div>
        </div>
        <MonthlyChart/>
        <TransactionList/>
       </div>
    
  );
}
