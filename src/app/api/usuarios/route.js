import { NextResponse } from "next/server";
import { conn } from "src/libs/db"
import getIdEmpresa from "../id_empresa";
import bcrypt from 'bcrypt';

export async function GET(request) {
    try {
      const { idEmpresa } = await getIdEmpresa(request);
      
      const results = await conn.query("SELECT * FROM users where is_active = 1 AND id_empresa = ?", [idEmpresa]);
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
      const { idEmpresa } = await getIdEmpresa(request);
      const { nombre, apellido, email ,password,id_empresa} = await request.json();
      const saltRounds = 10; // This value can be adjusted depending on the level of security you want.
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await conn.query("INSERT INTO users SET ?", {
        nombre,
        apellido,
        email,
        password : hashedPassword,
        id_empresa : idEmpresa,
        is_active: 1,
      });
  
      return NextResponse.json({
        nombre,
        apellido,
        email,
        password,
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
  