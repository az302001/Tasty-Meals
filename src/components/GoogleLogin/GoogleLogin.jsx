// import { signIn, signOut, useSession } from "next-auth/react";
// import React, { useEffect } from "react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import Google from "@/assets/google.png";

// const GoogleLogin = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       // Usuario autenticado
//       // console.log("Usuario autenticado:", session.user.name);
//       if (session.user.email === "tastymeals.0101@gmail.com") {
//         router.push("/dashboard"); // Redirigir directamente al dashboard
//       } else {
//         const previousPage = sessionStorage.getItem("currentPage");
//         router.push(previousPage);
//       }
//     } else if (status === "unauthenticated") {
//       // Usuario cerró sesión
//       console.log("Usuario cerró sesión");
//     }
//   }, [status, session, router]);

//   return (
//     <>
//       {status === "authenticated" ? (
//         <div>
//           Bienvenido/a {session.user.name}
//           <button type="button" onClick={() => signOut()}>
//             Cerrar sesión
//           </button>
//         </div>
//       ) : (
//         <div>
//           <div name="google-login-logo" className="w-14 h-14">
//             <button
//               type="button"
//               onClick={async (e) => {
//                 e.preventDefault();
//                 await signIn("google");
//               }}
//             >
//               <Image src={Google} alt={"google-login"}></Image>
//               {/* Google */}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GoogleLogin;

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Google from "@/assets/google.png";

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Usuario autenticado
      console.log("Usuario autenticado:", session.user.name);
      if (session.user.email === "tastymeals.0101@gmail.com") {
        router.push("/dashboard"); // Redirigir directamente al dashboard
      } else {
        const previousPage = sessionStorage.getItem("currentPage");
        router.push(previousPage);
      }
    } else if (status === "unauthenticated") {
      // Usuario cerró sesión
      console.log("Usuario cerró sesión");
    }
  }, [status, session, router]);
  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     // Usuario autenticado
  //     console.log('Usuario autenticado:', session.user.name);

  //     const previousPage = sessionStorage.getItem('currentPage');
  //     router.push(previousPage);
  //   } else if (status === 'unauthenticated') {
  //     // Usuario cerró sesión
  //     console.log('Usuario cerró sesión');
  //   }
  // }, [status, session, router]);

  return (
    <>
      {status === "authenticated" ? (
        <div>
          Bienvenido/a {session.user.name}
          <button type="button" onClick={() => signOut()}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <div name="google-login-logo" className="w-14 h-14">
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                await signIn("google");
              }}
            >
              <Image src={Google} alt={"google-login"}></Image>
              {/* Google */}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleLogin;