import { NextResponse } from "next/server";
import { conn } from "src/libs/db"

export async function GET() {
    try {
      const results = await conn.query("SELECT * FROM operators");
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
      const { nombre, telefono, telefono_2 ,RFC, apellido,is_active,id_enterprise} = await request.json();
      const result = await conn.query("INSERT INTO product SET ?", {
        nombre,
        telefono,
        telefono_2,
        RFC, 
        apellido,
        is_active,
        id_enterprise
      });
  
      return NextResponse.json({
        nombre,
        telefono,
        telefono_2,
        RFC, 
        apellido,
        is_active,
        id_enterprise,
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
  