import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function DELETE(req:Request,{params}:{params:{id:string}}) {
    const user = await getCurrentUser();
    
     if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }
      
    const {id:transactionId} = await params;
    try{
        await sql`DELETE FROM transactions
        WHERE id = ${transactionId}
        AND user_id = ${user.userId}`;
    return NextResponse.json({
        message:"Transaction deleted",
    });
}catch(error){
    console.error("DATABASE ERROR:",error);
    return NextResponse.json(
        {error:"Failed to delete transaction"},
        {status:500}
    );
}
}
