import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(){
    const user = await getCurrentUser();
    if(!user){
        return NextResponse.json(
            {error:"Unauthorized"},
            {status:401}
        );
    }
    try{
        const result = await sql `
          SELECT category,
          SUM(amount)::float AS total
          FROM transactions
          WHERE user_id = ${user.userId}
          GROUP BY category
        `;
        return NextResponse.json(result);
    }catch (error){
        console.log("DATABASE ERROR:",error);
        return NextResponse.json(
            {error:"Failed to fetch category data"},
            {status:500}
        );
    }
}