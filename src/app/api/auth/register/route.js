import { NextResponse } from "next/server";
import { conn } from "src/libs/db";
import util from "util";
import bcrypt from "bcrypt";

// Set up the promisified query as before
const query = util.promisify(conn.query).bind(conn);

export async function POST(request) {
  const {
    nombre,
    apellido,
    password,
    email,
    nombre_empresa,
    rfc,
    calle,
    num_int,
    num_ext,
    cp,
    colonia,
    estado,
    municipio,
  } = await request.json();
  // Validate the user's input. This is a very basic example.
  if (!nombre || !apellido || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Missing required user fields",
    });
  }

  try {
    // Generate a salt and hash the password along with the salt
    const saltRounds = 10; // This value can be adjusted depending on the level of security you want.
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Asignar "S/N" si num_int o num_ext están vacíos
    const numeroInterno = num_int ? num_int : "S/N";
    const numeroExterno = num_ext ? num_ext : "S/N";

    const result2 = await query("INSERT INTO enterprises SET ?", {
      nombre_empresa: nombre_empresa,
      rfc,
      calle,
      num_int: numeroInterno,
      num_ext: numeroExterno,
      cp,
      colonia,
      estado,
      municipio,
      is_active: 1,
    });

    const id_empresa = result2.insertId;
    console.log(id_empresa);

    // Now, you can store the hashed password in the database instead of the plain-text one
    const result = await query("INSERT INTO users SET ?", {
      nombre: nombre,
      apellido,
      password: hashedPassword, // Store the hashed password
      email,
      id_empresa: id_empresa,
      is_active: 1,
    });

    return NextResponse.json({
      status: 201,
      message: "Usuario creado correctamente",
      data: result,
    });
  } catch (error) {
    console.error(error); // More detailed error logging

    return NextResponse.json({
      status: 500,
      message: "Oops..! Error al crear el usuario",
    });
  }
}
