import { NextResponse } from "next/server";
import { conn } from "src/libs/db"

export async function GET() {
    try {
      const query = "SELECT * FROM operators where is_active = 1 AND  despacho ?"
      const results = await conn.query(query);
      return NextResponse.json(results);
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
}

export async function POST(request) {
    try {
      const { nombre_completo, telefono, telefono_2 ,rfc} = await request.json();
      const result = await conn.query("INSERT INTO operators SET ?", {
        nombre_completo,
        telefono,
        telefono_2,
        rfc,
        is_active: 1,
      });
  
      return NextResponse.json({
        nombre_completo,
        telefono,
        telefono_2,
        rfc, 
        id: result.insertId,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }
  