import { NextResponse } from "next/server";
import { conn } from "src/libs/db"

/** Funcion GET */

export async function GET() {
  try {
    // Realizamos la consulta con un JOIN para obtener datos de ambas tablas.
    const query = `
      SELECT trucks.*, operators.nombre_completo
      FROM trucks 
      INNER JOIN operators ON trucks.id_operador = operators.id where trucks.is_active = 1
    `;
    
    const results = await conn.query(query);


    return NextResponse.json(results); // Devolvemos los resultados ya formateados.

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
      const { placa, eco, nombre_camion ,marca,año,id_operador} = await request.json();

       // Verificar si el operador ya está asignado a un camión
      
      // Insertar el registro en la tabla trucks

      const result = await conn.query("INSERT INTO trucks SET ?", {
        placa,
        eco,
        nombre_camion,
        marca, 
        año,
        id_operador,
        is_active: 1,
      });
      
      return NextResponse.json({
        placa,
        eco,
        nombre_camion,
        marca, 
        año,
        id_operador,
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
  