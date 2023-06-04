
// import { signIn, signOut, useSession } from 'next-auth/react';
// import React, { useEffect } from 'react';

// const GoogleLogin = () => {
//     const { data: session, status } = useSession();

//     useEffect(() => {
//         if (status === 'authenticated') {
//             // Usuario autenticado
//             console.log('Usuario autenticado:', session.user.name);
//         } else if (status === 'unauthenticated') {
//             // Usuario cerró sesión
//             console.log('Usuario cerró sesión');
//         }
//     }, [status, session]);
//     return (
//         <>

//             {status === 'authenticated' ?
//                 <div>
//                     Bienvenido/a {session.user.name}
//                     <button type='button' onClick={() => signOut()}>Cerrar sesión</button>
//                 </div> : <div>
//                     <button type='button' onClick={async (e) => {
//                         e.preventDefault();
//                         await signIn("google")
//                     }}>Google</button>

//                 </div>
//             }
//         </>
//     );
// };
// export default GoogleLogin;


import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      // Usuario autenticado
      console.log('Usuario autenticado:', session.user.name);
      router.push('/home'); // Redirigir al home
    } else if (status === 'unauthenticated') {
      // Usuario cerró sesión
      console.log('Usuario cerró sesión');
    }
  }, [status, session, router]);

  return (
    <>
      {status === 'authenticated' ? (
        <div>
          Bienvenido/a {session.user.name}
          <button type='button' onClick={() => signOut()}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div>
          <button
            type='button'
            onClick={async (e) => {
              e.preventDefault();
              await signIn('google');
            }}
          >
            Google
          </button>
        </div>
      )}
    </>
  );
};

export default GoogleLogin;