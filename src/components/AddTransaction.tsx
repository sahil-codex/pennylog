"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function AddTransaction(){
    const router = useRouter();
    const [amount,setAmount] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState("");
    
    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/transactions",{
            method: "POST",
            credentials:"include",
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
             router.refresh();
           }else{
            alert("Failed to add transaction");
           }
    }
    return (
        <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-10">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>
             <div className="grid grid-cols-4 gap-4">
                <input type = "number" placeholder="Amount" className="border p-2 rounded" value={amount} onChange = {(e)=>setAmount(e.target.value)}
                required
            />
            <input type ="text" placeholder ="Category" className="border p-2 rounded" value={category} onChange = {(e)=>setCategory(e.target.value)}
            required
            />
             <input type ="text" placeholder ="Description" className="border p-2 rounded" value={description} onChange = {(e)=>setDescription(e.target.value)}
            required
            />
            <input type = "date" className="border p-2 rounded" value={date} onChange={(e)=>setDate(e.target.value)}
            required
            />
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Add Transaction 
            </button>
        </form>
    );
}