// En auth.js
import { getToken } from 'next-auth/jwt';
import { conn } from "src/libs/db"

async function getIdEmpresa(req) {
    const token = await getToken({ req });

    if (!token) {
        throw new Error('No autorizado');
    }

    const userId = token.id;
    // Asume que `conn` es una instancia de tu conexión a MySQL
    const userResult = await conn.query("SELECT id_empresa FROM users WHERE id = ?", [userId]);

    if (userResult.length === 0) {
        throw new Error('Usuario no encontrado');
    }


    return { idEmpresa: userResult[0].id_empresa };
}

export default getIdEmpresa;
