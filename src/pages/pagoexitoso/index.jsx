import Layaout from "@/components/Layaout/Layaout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecoilState } from "recoil";
import { cartState } from "../../../atoms/cartState";
import { createTransaction } from "@/redux/actions";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useRecoilState(cartState);
  const { data: session } = useSession();
  const userData = useSelector((state) => state.products.userData);
  const { status } = router.query;

  const calculateTotalPrice = () => {
    let newTotal = 0;
    cartItem.forEach(
      (item) => (newTotal += Math.ceil(item.price) * item.quantity)
    );
    return newTotal;
  };
  useEffect(() => {
    const foodsIds = cartItem.map((item) => item.id);
    const costo = calculateTotalPrice();
    let userId = session?.user?.id || userData?.data?.id;
  
    if (userId && costo && foodsIds) {
      let approved;
      if (status === "approved") {
        approved = true;
      } else if (status === "failure") {
        approved = false;
      }
      
      if (approved !== undefined) {
        dispatch(createTransaction(foodsIds, costo, userId, approved));
      }
    }
  }, []);

  return (
    <Layaout>
      <br></br>
      <br></br>
      <div className="text-center">
        <h1 className="text-blue-500 text-4xl font-bold mb-4">
          ¡Tu pago se realizó con éxito!
        </h1>
        <p className="text-green-500 text-lg mb-8">
          En breve te llegará un correo con los detalles del envío.
        </p>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
          onClick={() => (window.location.href = "/home")}
        >
          Ir a la página de inicio
        </button>
      </div>
      <br></br>
      <br></br>{" "}
      {/*agregué saltos de linea solo para que no se renderice tan arriba el footer. */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Layaout>
  );
};
export default index;
