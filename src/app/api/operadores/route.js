import { NextResponse } from "next/server";
import { conn } from "src/libs/db"
import { getToken } from "next-auth/jwt";

export async function GET(request) {

  
    try {
      const token = await getToken({ req: request })
      
      console.log("token",token);

      if (!token) {
          // Manejar el caso cuando no hay sesión
          return new Response(JSON.stringify({ message: 'No autorizado' }), { status: 401 });
      }

      // Obtener el id del usuario desde el token
      const userId = token.id;

      console.log("userId",userId);

      // Realizar una consulta SQL para obtener el id_empresa del usuario
      const userResult = await conn.query("SELECT id_empresa FROM users WHERE id = ?", [userId]);
      if (userResult.length === 0) {
          return new Response(JSON.stringify({ message: 'Usuario no encontrado' }), { status: 404 });
      }
      const idEmpresa = userResult[0].id_empresa;
      console.log("idEmpresa",idEmpresa);


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
  