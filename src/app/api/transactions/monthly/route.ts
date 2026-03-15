import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
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
        const monthlyExpenses = await sql`
        SELECT TO_CHAR(transaction_date,'Mon') AS month,
        SUM(amount) AS total
        FROM transactions
        WHERE user_id = ${user.userId}
        GROUP BY month
        ORDER BY MIN(transaction_date)`;

        return NextResponse.json(monthlyExpenses);
    } catch(error){
        console.log("DATABSE ERROR:",error);

        return NextResponse.json(
            {error:"Failed to fetch monthly expenses"},
            {status:500},
        );
    }
}