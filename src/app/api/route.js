import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth/[...nextauth]/route";

export async function GET(request) {
    const session = await getServerSession({  authOptions });

    console.log("session", session);


    if (session) {

        return NextResponse.json({  status: 200,  message: "Usuario autenticado",  data: session.user  });
        
    }

    return NextResponse.redirect("http://localhost:3000");
}