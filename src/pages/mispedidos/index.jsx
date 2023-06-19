import Layaout from "@/components/Layaout/Layaout";
import { getTransactions } from "@/redux/actions";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const transactions = useSelector((state) => state.products.userTransactions);
  const dispatch = useDispatch();
  const userId = session?.user?.id || userData?.data?.id;
  console.log(userId);
  console.log(transactions);

  useEffect(() => {
    if (userId) {
      dispatch(getTransactions(userId));
    }
  }, [userId]);
  return (
    <Layaout>
      <div className="container mx-auto">
      <h1 className="text-3xl font-medium mt-5 mb-8 text-center">Pedidos anteriores</h1>
        {
          (transactions.length > 0) 
          ? 
            transactions?.map((transaction) => (
              <div className="m-4">
                {
                  transaction?.food?.map((product) => (
                    <article className="flex items-start space-x-6 p-4 border-2 border-gray-300">
                      <img src={product?.image} alt={product?.name} width="88" height="88" className="flex-none rounded-md bg-slate-100" />
                      <div className="min-w-0 relative flex-auto">
                        {
                          (transaction?.approved) ? 
                          <p className="text-green-700 font-semibold uppercase" style={{"fontSize": "13px"}}>Entregado</p> 
                          : 
                          <p className="text-red-700 font-medium uppercase" style={{"fontSize": "13px"}}>Cancelado</p>
                        }
                        <h2 className="font-semibold text-slate-900 truncate pr-20">{product?.name}</h2>
                        <dl className="mt-0 flex flex-wrap text-sm leading-6 font-medium">
                          <div>
                            <dd className="text-gray-500">${product?.price * product?.quantity} - {product?.quantity} {(product?.quantity === 1) ? "Producto" : "Productos"}</dd>
                          </div>
                        </dl>

                        <div className="absolute top-0 right-0 flex items-center space-x-1">
                          <button class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Volver a pedir</button>
                        </div>
                      </div>
                    </article>
                  ))
                }
              </div>
            ))
          : 
            <div className="flex flex-col justify-center items-center">
              <h2 className="mt-5 text-2xl">No tienes pedidos realizados.</h2>
            </div>
        }
      </div>
    </Layaout>
  );
}
