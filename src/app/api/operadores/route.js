import { NextResponse } from "next/server";
import { conn } from "src/libs/db"
import getIdEmpresa from "../id_empresa";


export async function GET(request) {

  
    try {
      const { idEmpresa } = await getIdEmpresa(request);

      const results = await conn.query("SELECT * FROM operators WHERE is_active = 1 AND id_enterprise = ?", [idEmpresa]);
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
      const result = await conn.query("INSERT INTO operators SET ? WHERE id_empresa = ", {
        nombre_completo,
        telefono,
        telefono_2,
        rfc,
        is_active: 1,
        id_enterprise: idEmpresa,
      }, [idEmpresa]);
  
      return NextResponse.json({
        nombre_completo,
        telefono,
        telefono_2,
        rfc, 
        id_empresa,
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
  