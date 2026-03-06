import {cookies} from "next/headers";
import { verifyToken } from "@/src/lib/auth";

export async function getCurrentUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return null;
    }

    try{
        const payload = verifyToken(token);
        return payload;
    }catch{
        return null;
    }
}