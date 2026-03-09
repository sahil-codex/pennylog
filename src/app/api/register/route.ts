import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();
    const { email,password} = body;

    if(!email||!password) {
        return NextResponse.json({error: "Missing fields"},{status:400});
    }
    const hashedPassword  = await bcrypt.hash(password, 10);
     try{
    await sql`
        INSERT INTO users (email , password_hash) VALUES  (${email},${hashedPassword})`
        
    ;
     }catch(error){
    return NextResponse.json({ error: "User created"},
        { status:400 }
    );
}
}
