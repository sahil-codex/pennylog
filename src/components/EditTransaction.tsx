"use client";
import { useState } from "react";


export default function EditTransaction({transaction,onClose}:any){
    const [amount,setAmount]=useState(transaction.amount);
    const [category,setCategory] = useState(transaction.category);
    const[description,setDescription] = useState(transaction.description);
    const [date,setDate] = useState(
        new Date(transaction.transaction_date)
        .toISOString()
        .split("T")[0]
    );
    async function handleUpdate(e:React.FormEvent){
        e.preventDefault();
        const res =  await fetch(`/api/transactions/${transaction.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({
                amount:Number(amount),
                category,
                description,
                transaction_date:date,
            }),
        });
        if(res.ok){
            window.location.reload();
        }else{
            alert("Update failed");
        }
    }
    return (
        <>
        <td className="p-2">
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} className="border p-2 rounded w-full max-w-37.5"/>
             </td>

             <td className="p-2">
            <input value={category} onChange={(e)=>setCategory(e.target.value)} className="border p-2 rounded w-full max-w-37.5"/>
             </td>
             
             <td>
             <input value={description} onChange={(e)=>setDescription(e.target.value)} className="border p-2 rounded w-full max-w-37.5"/>
             </td>

            <td className="p-2">
             <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="border p-2 rouded w-full max-w-37.5"/>
             </td>
            
             <td className="p-2">
                <div className="flex gap-2 items-center">
             <button  onClick={handleUpdate} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">Save</button>
             <button onClick={onClose} className="bg-gray-300 px-3 py-1 text-sm hover:underline">Cancel</button>
             </div>
             </td>
        </>
    )
}