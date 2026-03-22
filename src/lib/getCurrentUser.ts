import {cookies} from "next/headers";
import { verifyToken } from "@/lib/auth";
import {sql} from "@/lib/db";
export async function getCurrentUser(){
    const cookieStore =  await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token){
        return null;
    }

    try{
        const payload = verifyToken(token);
       const result = await sql`
       SELECT id,email
       FROM users
       WHERE id = ${payload.userId}`;
       if(result.length===0) return null;
       const user = result[0]; 
       return {
        userId:user.id,
        email:user.email,
       };
    }catch{
        return null;
    }
}