"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleSubmit (e:React.FormEvent){
        e.preventDefault();
        const res = await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        });
        const data = await res.json();
        if(res.ok){
            router.push("/login");
        }else{
            alert(data.error || "Registeration failed");
        }
        }
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
                <form onSubmit={handleSubmit} className= "space-y-4">
                    <input type="email" placeholder="Email" className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={(e)=>setEmail(e.target.value)}required />
                    <input type="password" placeholder="Password" className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={password} onChange={(e)=>setPassword(e.target.value)}required />
                    <button type="submit" className=" bg-green-500 text-white w-full p-3 rounded-lg hover:bg-green-600 transaction">Create Account</button>
                </form>
                <p className="text-center text-gray-500 mt-6">Already have an account?{" "} <Link href="/login" className="text-blue-500 hover:underline">Login</Link></p>
            </div>
            </div>
        )
    }
