import { toast } from "react-toastify"

export const handleBlurEmail = ({ target: { value, name } }) => {
    // validación de correo electrónico
    if (!value) {
        toast.error('El correo electrónico es obligatorio.', { duration: 1500 })
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(value)) {
        toast.error('Dirección de correo electrónico no válida.', { duration: 1500 })
    }
}