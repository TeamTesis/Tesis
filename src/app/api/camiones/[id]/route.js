import { NextResponse } from "next/server";
import { conn } from "src/libs/db";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM trucks WHERE id = ?", [
      params.id,
    ]);
    if (result.length == 0) {
      return NextResponse.json(
        {
          message: "Unidad no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

/*export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM trucks WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Unidad no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}*/

export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    // Si la acción es restaurar
    if (data.action && data.action === "restore") {
      const result = await conn.query(
        "UPDATE trucks SET is_active = 0 WHERE id = ?",
        [params.id]
      );
      if (result.affectedRows == 0) {
        return NextResponse.json(
          {
            message: "Unidad no encontrada",
          },
          {
            status: 404,
          }
        );
      }

      return new Response(null, {
        status: 204,
      });
    } else {
      // Actualización general
      const result = await conn.query("UPDATE trucks SET ? WHERE id = ?", [
        data,
        params.id,
      ]);

      if (result.affectedRows == 0) {
        return NextResponse.json(
          {
            message: "Unidad no encontrada",
          },
          {
            status: 404,
          }
        );
      }
    }
    const updatedTruck = await conn.query("SELECT * FROM trucks WHERE id = ?", [
      params.id,
    ]);
    return NextResponse.json(updatedTruck[0]);
  } catch (error) {
    return NextResponse.json8(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

/*export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE trucks SET ? WHERE id = ?", [
      data,
      params.id,
    ]);

    if (result.affectedRows == 0) {
      return NextResponse.json(
        {
          message: "Unidad no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    const updatedTruck = await conn.query(
      "SELECT * FROM trucks WHERE id = ?",
      [params.id] 
    );

    return NextResponse.json(updatedTruck[0]);
  } catch (error) {
    return NextResponse.json8(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}*/
