"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RegisterPage(){
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [loading,setLoading] = useState(false);

    async function handleSubmit (e:React.FormEvent){
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        const trimmedEmail = email.trim();
        const res = await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:trimmedEmail,
                password
            })
        });
        const data = await res.json();
        setLoading(false);
        if(res.ok){
             setEmail("");
             setPassword("");
            setSuccess("Account created! Redirecting...");
            setTimeout(()=>{
                 router.push("/login");
            },1000);
           
        }else{
            setError(data.error || "Registration failed");
        }
        }
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
                  {error &&(<p className="bg-red-100 text-red-600 p-2 rounded text-sm text-center mb-4">{error}</p>)}
                  {success &&( <p className="bg-green-100 text-green-700 p-2 rounded text-sm text-center mb-4">{success}</p>)}
                <form onSubmit={handleSubmit} className= "space-y-4">
                    <input type="email" disabled={loading} placeholder="Email" className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={(e)=>{setEmail(e.target.value); if(error) setError("");}} required />
                    <input type="password" disabled={loading} placeholder="Password" className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" value={password} onChange={(e)=>{setPassword(e.target.value); if(error) setError(""); }}required />
                    <button type="submit" disabled={loading} className=" bg-green-500 text-white w-full p-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed">{loading? "Creating...":"Create Account"}</button>
                </form>
                <p className="text-center text-gray-500 mt-6">Already have an account?{" "} <Link href="/login" className="text-blue-500 hover:underline">Login</Link></p> 
            </div>
            </div>
        )
    }
