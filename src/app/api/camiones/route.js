import { NextResponse } from "next/server";
import { conn } from "src/libs/db"
import getIdEmpresa from "../id_empresa";
/** Funcion GET */

export async function GET(request) {
  try {
    // Realizamos la consulta con un JOIN para obtener datos de ambas tablas.
    const { idEmpresa } = await getIdEmpresa(request);

    const results = await conn.query("SELECT trucks.*, operators.nombre_completo FROM trucks INNER JOIN operators ON trucks.id_operador = operators.id WHERE trucks.is_active = 1 AND trucks.id_enterprise = ?", [idEmpresa]);
    return NextResponse.json(results);// Devolvemos los resultados ya formateados.*/
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

/** Funcion POST */

export async function POST(request) {
    try {
      // Realizamos la consulta con un JOIN para obtener datos de ambas tablas.
      const { idEmpresa } = await getIdEmpresa(request);
      const { placa, eco, nombre_camion ,marca,año,id_operador,id_enterprise} = await request.json();

      const result = await conn.query("INSERT INTO trucks SET ?", {
        placa,
        eco,
        nombre_camion,
        marca, 
        año,
        id_operador,
        id_enterprise: idEmpresa,
        is_active: 1,
      });
      
      return NextResponse.json({
        placa,
        eco,
        nombre_camion,
        marca, 
        año,
        id_operador,
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
  