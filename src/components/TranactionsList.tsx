import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";
import TransactionRow from "./TransactionRow";



export default async function TransactionList(){
    const user= await getCurrentUser();
    if(!user) return null;
    const transactions = await sql`
    SELECT * FROM transactions
     WHERE user_id =${user.userId}
     ORDER BY transaction_date DESC`;
     return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr className="border-t hover:bg-gray-50">
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Description</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length ===0?( 
                        <tr>
                            <td colSpan={5} className="text-center p-4 text-gray-500">No transaction yet. Add your first expense 💰</td>
                        </tr>
                    ):(
                    transactions.map((t:any)=>(
                      <TransactionRow key={t.id} transaction={t}/>
                    ))
                )}
                </tbody>
            </table>
        </div>
     )
}