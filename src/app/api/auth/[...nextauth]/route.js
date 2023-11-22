import { NextResponse } from "next/server";
import { conn } from "src/libs/db";
import util from "util";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const query = util.promisify(conn.query).bind(conn);

 export const handler = NextAuth ({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token, user }) {
            // If user object is available, it means a new sign-in has occurred
            if (user) {
                token.id = user.id; // Add the user ID to the token
                token.name = user.nombre; // Add the user name to the token
                token.email = user.email; // Add the user email to the token
                token.id_empresa = user.id_empresa; // Add the user's id_empresa to the token
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id, // Include user ID in the session
                name: token.name, // Include user name in the session
                email: token.email, // Include user email in the session
                id_empresa: token.id_empresa // Include user's id_empresa in the session
            };
            return session;
        }
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Contraseña", type: "password", placeholder: "*********" },
            },
            async authorize(credentials) {
                const result = await query("SELECT * FROM users WHERE email = ?", [credentials.email] );
                    
                    // if (result.length > 0) {
                    //     const user = result[0];
                    //     console.log(user);

                    //     const passwordMatch = await bcrypt.compare(credentials.password || "", user.password);
                    //     if (passwordMatch) {
                    //         return {
                    //             id: user.id,
                    //             name: user.nombre,
                    //             email: user.email,
                    //         };
                    //     }
                    // }

                if (!result) throw new Error("No se encontró el usuario");

                console.log("result" , result)

                const user = result[0];

                const passwordMatch = await bcrypt.compare(credentials.password || "", user.password);
                console.log("passwordMatch", passwordMatch)

                if (!passwordMatch) throw new Error("Contraseña incorrecta")

                return {
                    id: user.id,
                    name: user.nombre,
                    email: user.email,
                    apellido: user.apellido,
                };


                // try {
                    
                //     const result = await query("SELECT * FROM users WHERE email = ?", [credentials.email] );
                    
                //     // if (result.length > 0) {
                //     //     const user = result[0];
                //     //     console.log(user);

                //     //     const passwordMatch = await bcrypt.compare(credentials.password || "", user.password);
                //     //     if (passwordMatch) {
                //     //         return {
                //     //             id: user.id,
                //     //             name: user.nombre,
                //     //             email: user.email,
                //     //         };
                //     //     }
                //     // }

                //     if (!result) throw new Error("No se encontró el usuario");

                //     console.log("result" , result)

                //     const user = result[0];

                //     const passwordMatch = await bcrypt.compare(credentials.password || "", user.password);
                //     console.log("passwordMatch", passwordMatch)

                //     if (!passwordMatch) throw new Error("Contraseña incorrecta")

                //     return {
                //         id: user.id,
                //         name: user.nombre,
                //         email: user.email,
                //         apellido: user.apellido,
                //     };

                // } catch (error) {
                //     console.error(error);
                // }
            }
        })
    ],
});

export { handler as GET, handler as POST };