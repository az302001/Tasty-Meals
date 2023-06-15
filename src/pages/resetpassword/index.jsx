import Head from 'next/head'
import * as Yup from 'yup';
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { HiAtSymbol } from 'react-icons/hi';
import { handleBlurEmail } from '@/utils/validate';
import RegisterLoader from '@/components/Loader/index';
import Link from 'next/link';
import axios from 'axios'
import { getSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
const Resetpassword = () => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Enter a valid email')
            .required('Email is required'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit,
    });
    async function onSubmit(values, { resetForm }) {
        try {
            setLoader(true)
            const response = await axios.put(`/api/auth/resetpassword`, {
                email: values.email,
            })
            if (response.status === 200) {
                resetForm()
                setLoader(false)
                toast.success('Contraseña restablecida!', { duration: 5000 })
                router.push('/login')
            } else {
                setLoader(false)
                toast.error('Perdón, algo salió mal. Por favor, inténtelo de nuevo más tarde.', { duration: 5000 })
            }
        } catch (error) {
            setLoader(false)
            toast.error('Perdón, algo salió mal.', { duration: 5000 })
        }
    }
    return (
        <div className="">
            <Head>
                <title>Restablecer contraseña</title>
            </Head>
            <div className="">
                <form className="" onSubmit={formik.handleSubmit}>
                    <h1>¿Olvidaste tu contraseña?</h1>
                    <p className="">Si olvidó su contraseña, no se preocupe: Ingrese su dirección de correo electrónico asociada con su cuenta. Le enviaremos una nueva contraseña temporal para que pueda iniciar sesión de inmediato.</p>
                    <div className="">
                        <span className="">
                            <HiAtSymbol size={28} className="" />
                        </span>
                        <input type="text"
                            placeholder={formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
                            className=""
                            {...formik.getFieldProps('email')}
                            onBlur={(e) => {
                                formik.handleBlur(e)
                                handleBlurEmail(e)
                            }} />
                    </div>
                    <div className="">
                        <button type="submit" className="">Continuar</button>
                        <Link href={'/'}><button type="submit" className="">Cancelar</button></Link>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                reverseOrder={true}
            />
            {loader && <RegisterLoader />}
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {
            session
        }
    }
}
export default Resetpassword