import Layaout from "@/components/Layaout/Layaout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransactionStatus } from "@/redux/actions";
import { PageProtection } from "@/Hocs/sesionVerify";
import { useRecoilState } from "recoil";
import { transaction } from "../../../atoms/transaction";

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const transactionId = useSelector((state) => state.products.transactionId);
  // const [transactionId,setransactionId]= useRecoilState(transaction);
  // const { status } = router.query;

  const urlParams= new URLSearchParams(window.location.search)
  const status = urlParams.get('status');

  const transactionId= localStorage.getItem('transactionID')
  console.log( "transaction pago exitoso", transactionId);
  useEffect(() => {
    // const urlParams= new URLSearchParams(window.location.search)
    // var status = urlParams.get('status');
    console.log("status en pago exitoso",status)
    if (status === "approved") {
      dispatch(updateTransactionStatus(parseInt(transactionId))).then (localStorage.setItem("transactionID",0));
     
    } 
  }, []);

  return (
    <Layaout>
      <br></br>
      <br></br>
      <div className="text-center">
        <h1 className="text-blue-500 text-4xl font-bold mb-4">
          {status === "approved"
            ? "¡Tu pago se realizó con éxito!"
            : "Parece que hubo un error al procesar el pago."}
        </h1>
        <p className="text-green-500 text-lg mb-8">{status === "approved"
            ? "En breve te llegará un correo con los detalles del envío."
            : "Por favor, intenta nuevamente."}</p>
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
export default PageProtection(index);
