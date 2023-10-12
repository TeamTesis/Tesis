import { NextResponse } from "next/server";
import { conn } from "src/libs/db"

export async function GET() {
    const result = await conn.query("SELECT NOW()");
    console.log(result);
    return NextResponse.json({ message: result[0]["NOW()"] });
  }
  