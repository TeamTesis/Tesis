import { NextResponse } from "next/server";
import { conn } from "@/libs/db";

export async function POST() {
    const { fullname, email, password, nodo } = await request.json();
    console.log(fullname, email, password, nodo);
  
    if (!password || password.length < 6)
      return NextResponse.json(
        {
          message: "Password must be at 6 characters",
        },
        {
          status: 400,
        }
      );
    return NextResponse.json({ message: "signUp" });
  }
  