import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getUserSummary } from "@/lib/summary";

export async function GET(){
    const user = await getCurrentUser();

     if(!user){
        return NextResponse.json(
            {error: "Unauthorized"},
            {status:401}
        );
    }

   const summary = await getUserSummary(user.userId);
   return NextResponse.json(summary);
    
}