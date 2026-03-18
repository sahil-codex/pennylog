import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
   const {id} = await params;
    const user = await getCurrentUser();
 if(!user){
    return NextResponse.json(
        {error:"Unauthorized"},
        {status:401}
    );
 }
 const body = await req.json();
 const {amount ,category,description,transaction_date} = body;
 try{
    await sql`
    UPDATE transactions SET amount = ${amount},
    category = ${category},
    description = ${description},
    transaction_date = ${transaction_date}
    WHERE id = ${id}
    AND user_id = ${user.userId}`;
    return NextResponse.json({message:"Updated"});

 }catch(error){
    console.log("DATABASE ERROR:",error);
    return NextResponse.json(
        {error:"Failed to update"},
        {status:500}
    );
 }
}
export async function DELETE(req:NextRequest,context:{params:Promise<{id:string}>}) {
    const user = await getCurrentUser();
    
     if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }
      
    const {id:transactionId} = await context.params;
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
