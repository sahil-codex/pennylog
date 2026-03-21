"use client";
import { useState } from "react";
import EditTransaction from "./EditTransaction";
import { useRouter } from "next/navigation";

export default function TransactionRow({ transaction }: any) {
   const [editing, setEditing] = useState(false);
   const [loading,setLoading] = useState(false);
   const router = useRouter();
  
   async function deleteTransaction() {
    setLoading(true);
    const res = await fetch(`/api/transactions/${transaction.id}`, {
      method: "DELETE",
      credentials:"include",
    });
 

    if (res.ok) {
       router.refresh();
    } else {
      alert("Failed to delete transaction");
    }
    setLoading(false);
  }
    if(editing){
      return (
        <tr className="border-t bg-gray-50">
            <EditTransaction 
            transaction = {transaction}
            onClose = {()=> setEditing(false)}
            />
        </tr>
      );
    }
  return (
    <tr className="border-t hover:bg-gray-50">

      <td className="p-2">
        {new Date(transaction.transaction_date).toLocaleDateString()}
      </td>

      <td className="p-2">{transaction.category}</td>

      <td className="p-2">{transaction.description}</td>

      <td className="p-2 font-semibold">${Number(transaction.amount).toFixed(2)}</td>

      <td className="p-2 flex gap-3">
        <button onClick={() => setEditing(true)} className="text-blue-500  hover:underline">Edit</button>
        <button onClick={deleteTransaction} className="text-red-500 hover:underline">Delete</button>
      </td>

    </tr>
  );
}