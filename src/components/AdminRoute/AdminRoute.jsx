import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layaout from "@/components/Layaout/Layaout";

const AdminRoute = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const userData = useSelector((state) => state.products.userData);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = userData?.data?.role === "admin";
      // console.log(isAuthenticated);
      if (!isAuthenticated) {
        router.push("/menu");
      } else {
        setIsReady(true);
      }
    };
    checkAuthentication();
  }, [userData]);

  if (!isReady) {
    return (
      <Layaout>
        <div className="text-center mt-[20%]">
          <p className="text-3xl text-color1 font-bold">Verificando sesión...</p>
        </div>
      </Layaout>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
// const [isReady, setIsReady] = useState(false);
// const userData = useSelector((state) => state.products.userData);
// const router = useRouter();


// useEffect(() => {
//   const checkAuthentication = async () => {
//     const isAuthenticated = userData?.data?.role === 'admin';
//     if (!isAuthenticated) {
//       router.replace("/menu");
//     } else {
//       setIsReady(true);
//     }
//   };
//   checkAuthentication();
// }, []);


// if (!isReady) {
//   return(
//     <Layaout>
//      <div className="text-center mt-[20%]">
//        <p className="text-2xl text-color1">Verificando sesión...</p>
//      </div>
//     </Layaout>
//   );
// }
