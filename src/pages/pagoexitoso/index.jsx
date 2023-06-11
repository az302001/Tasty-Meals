import Layaout from "@/components/Layaout/Layaout";
const index = () => {
    return(
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
            <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded" onClick={() => window.location.href = '/home'}>
                Ir a la página de inicio
            </button>
        </div>
        <br></br>
        <br></br> {/*agregué saltos de linea solo para que no se renderice tan arriba el footer. */}
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
    )
}
export default index;