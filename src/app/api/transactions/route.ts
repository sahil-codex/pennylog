import {NextResponse} from "next/server";
import {sql} from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function POST(req: Request){
   try{
    const user = await getCurrentUser();
     
    if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }
    const body= await req.json(); 
        const {amount ,category,description,transaction_date} = body;
    
        if(amount===undefined||!category||!transaction_date){
            return NextResponse.json(
                {error:"Missing required fields"},
                {status: 400}
            );
        }

        const transaction = await sql`
        INSERT INTO transactions (
        user_id,
        amount,
        category,
        description,
        transaction_date
    )
        VALUES(
        ${user.userId},
        ${amount},
        ${category},
        ${description},
        ${transaction_date}
        )RETURNING * `;
      return NextResponse.json(transaction[0]);
   }catch(error){
    
    return NextResponse.json(
        {error:"Server error"},
        { status:500}
    );
        
}
}

export async function GET(){
    const  user= await getCurrentUser();  
    if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }

    try{
        const transaction = await sql`
        SELECT * FROM transactions
        WHERE user_id = ${user.userId}
        ORDER BY transaction_date DESC`;

        return NextResponse.json(transaction);
     } catch(error){
            console.error("DATABASE ERROR:",error);
            return NextResponse.json(
                {error:"Failed to fetch transactions"},
                {status:500}
            );
        }
}