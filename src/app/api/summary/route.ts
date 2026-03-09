import { NextResponse } from "next/server";
import { sql} from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function GET(){
    const user = await getCurrentUser();

     if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }

    try{
        const result = await sql`
        SELECT COUNT(*) as transaction_count,
        COALESCE(SUM(amount),0) as total_expense,
        COALESCE(SUM(amount)FILTER(
        WHERE DATA_TRUNC ('month',transaction_date)= DATA_TRUNC('month',CURRENT_DATA)
        ),0) as this_month_expense
        FROM transactions
        WHRE user_id = ${user.userId}
        `;

        return NextResponse.json(result[0]);
    } catch(error){
        console.error("DATABASE ERROR:",error);
        return NextResponse.json(
            {error:"Failed to fetch summary"},
            {status:500}
        );
    }
}