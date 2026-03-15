"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage(){
    const router = useRouter();
    const[email,setEmail] =useState("");
    const [password,setPassword] = useState("");
    
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const res= await fetch("/api/login",{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type" : "application/json", 
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if(res.ok){
            router.push("/dashboard");
        }else {
            alert("Invalid email or password");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit}
            className="b-white p-8 rounded shadow w-96">
                <h1 className="text -2xl font-bold mb-6">Login</h1>
                <input type = "email" placeholder = "Email" className="border p-2 w-full mb-4 rounded" value ={email} onChange = {(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" className="border p-2 w-full mb-4 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type = "submit" className="bg-blue-500 text-white w-full p-2 rounded">Login</button>
            </form>
        </div>
    )
}