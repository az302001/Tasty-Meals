import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/prisma/prisma';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
   
    callbacks: {
        async session({ session, token }) {
            // console.log(token);
            if (token?.sub && session?.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt(params) {
            await prisma.user.findUnique({
                where: {
                    email: params.token.email,
                },
            });
            return params.token;
        },
    },  

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
    },
});


