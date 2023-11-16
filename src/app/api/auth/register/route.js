import { NextResponse } from "next/server";
import { conn } from "src/libs/db";
import util from "util";
import bcrypt from 'bcrypt';

// Set up the promisified query as before
const query = util.promisify(conn.query).bind(conn);

export async function POST(request) {
    const { nombre, apellido, password, email, id_empresa, is_active } = await request.json();

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

        // Now, you can store the hashed password in the database instead of the plain-text one
        const result = await query("INSERT INTO users SET ?", {
            nombre,
            apellido,
            password: hashedPassword, // Store the hashed password
            email,
            id_empresa,
            is_active
        });

        return NextResponse.json({
            status: 201,
            message: "Usuario creado correctamente",
            data: result
        });
    } catch (error) {
        console.error(error); // More detailed error logging

        return NextResponse.json({
            status: 500,
            message: "Oops..! Error al crear el usuario",
        });
    }
}
