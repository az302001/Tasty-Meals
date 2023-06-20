// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/prisma/prisma";

// export default NextAuth({
//   adapter: PrismaAdapter(prisma),

//   callbacks: {
//     async session({ session, token }) {
//       // console.log(token);
//       if (token?.sub && session?.user) {
//         session.user.id = token.sub;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//     async jwt(params) {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: params.token.email,
//         },
//       });
//       if (user) {
//         params.token.role = user.role
//       }
//       return params.token;
//     },
//   },

 
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.JWT_SECRET,
//   session: {
//     strategy: "jwt",
//   },
// });
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/prisma";
import Users from "@/pages/dashboard/users";

export default NextAuth({
  adapter: PrismaAdapter(prisma),

  callbacks: {
    async session({ session, token }) {
      // console.log(token);
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt(params) {
      const user = await prisma.user.findUnique({
        where: {
          email: params.token.email,
        },
      });
      if (user) {
        params.token.role = user.role
      }
      if (params.trigger === "signUp"){
        const users = await prisma.user.findMany();
        if (users.length === 1){
          await prisma.user.update({
            where: {email:params.token.email},
            data: {role:"admin"},
          });
          
        }
      }
      return params.token;
    },
  },

 
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
});