"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function LogoutButton(){
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    async function handleLogout(){
        setLoading(true);

        await fetch("/api/logout",{
            method:"POST",
        });
        router.push("/login");
    }
    return (
        <button onClick={handleLogout}
        disabled = {loading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transtion disabled:opacity-50"
         > {loading? "logging out...":"Logout"}</button>  
    );
}