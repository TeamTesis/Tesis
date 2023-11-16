import { NextResponse } from "next/server";
import { conn } from "src/libs/db";
import util from "util";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const query = util.promisify(conn.query).bind(conn);

 const handler = NextAuth ({
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const result = await query("SELECT * FROM users WHERE email = ?", [credentials.email] );
                    
                    if (result.length > 0) {
                        const user = result[0];
                        const passwordMatch = await bcrypt.compare(credentials.password || "", user.password);
                        if (passwordMatch) {
                            return {
                                ...user,
                            };
                        }
                    }
                } catch (error) {
                    console.error(error);
                }

                return null;
            }
        })
    ],
});

export { handler as GET, handler as POST };