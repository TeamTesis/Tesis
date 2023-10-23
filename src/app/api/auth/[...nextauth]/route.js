import { NextResponse } from "next/server";
import { conn } from "@/libs/db";
import util from "util";
import bcrypt from 'bcrypt';

const query = util.promisify(conn.query).bind(conn);

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: {
        credentials: {
            async authorize(credentials) {
                console.log(credentials);
                
                const { correo, contraseña } = credentials;

                if (!correo || !contraseña) {
                    return NextResponse.next();
                }

                try {
                    const result = await query("SELECT * FROM users WHERE correo = ?", [correo]);

                    if (result.length > 0) {
                        const user = result[0];
                        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);

                        if (passwordMatch) {
                            return {
                                ...user,
                                password: undefined,
                            };
                        }
                    }
                } catch (error) {
                    console.error(error);
                }

                return null;
            },
        },
    },
}
  