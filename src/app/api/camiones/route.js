import { NextResponse } from "next/server";
import { conn } from "src/libs/db"

/** Funcion GET */

export async function GET() {
  try {
    // Realizamos la consulta con un JOIN para obtener datos de ambas tablas.
    const query = `
      SELECT trucks.*, operators.nombre, operators.apellido 
      FROM trucks 
      INNER JOIN operators ON trucks.id_operador = operators.id
    `;
    
    const results = await conn.query(query);

    // (Opcional) Si deseas, puedes reformatear los resultados aquí, por ejemplo, combinando nombre y apellido.
    const formattedResults = results.map(truck => {
      return {
        ...truck,
        operador: truck.nombre + ' ' + truck.apellido
      };
    });

    return NextResponse.json(formattedResults); // Devolvemos los resultados ya formateados.

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
      const { placa, eco, nombre_camion ,marca, modelo,año,id_operador} = await request.json();
      const result = await conn.query("INSERT INTO trucks SET ?", {
        placa,
        eco,
        nombre_camion,
        marca, 
        modelo,
        año,
        id_operador
      });
      return NextResponse.json({
        placa,
        eco,
        nombre_camion,
        marca, 
        modelo,
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
  