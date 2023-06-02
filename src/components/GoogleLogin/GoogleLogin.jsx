import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';


const GoogleLogin = () => {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        return (
            <>
              Bienvenido/a {session.user.name}
              <button onClick={() => signOut}>Log out</button>
            </>
        );
    } else {
        return (
            <>
              Registrarse con:
              <button onClick={() => signIn}>Google</button>
            </>
        );
    }
};

export default GoogleLogin;