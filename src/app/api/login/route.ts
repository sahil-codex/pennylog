import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sql } from "@/src/lib/db";
import { signToken } from "@/src/lib/auth";

export async function POST(req: Request){
    //read json body sent by client and convert it into js obj
    const {email,password} = await req.json();
   
   //Checks if either field is missing.
    if(!email || !password){
        return NextResponse.json({error:"Missing fields" },{ status:400 });
    }

    const user = await sql`
    SELECT id, password_hash
    FROM users
    WHERE email = ${email}`;  //this lib automatically parameterizes queries which prevent SQL injection

   //checks if uer exists
    if(user.length ===0){
        return NextResponse.json(
            {error:"Invalid credentials "},
            { status:401 }
        );
    }

    //extracting the user
    const dbUser = user[0];
    
    //compare entered password with stored hash
    const passwordMatch = await bcrypt.compare(
        password,
        dbUser.password_hash
    );

    if(!passwordMatch){
        return NextResponse.json(
            { error: "Invalid credentials"},
            { status:401}
        );
    }
        const token = signToken(dbUser.id);
        const response = NextResponse.json({
            message: "Login succesfully",
        });
        response.cookies.set("token",token,{
            httpOnly: true, //prevents XSS attacks
            secure:process.env.NODE_ENV === "production",
            sameSite: "strict",  //protect against CSRF attacks
            path: "/", //cookie is valid for the entire site
        });
        return response;
    }
