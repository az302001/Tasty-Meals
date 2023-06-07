import React from 'react';
import Link from 'next/link';
import { PlusIcon } from "@heroicons/react/24/outline";

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('!Se agrego el plato con exito!');

const Card = ({ food }) => {
    const { id, name, image, price, description } = food;

    return (
        <div className="bg-color3 flex flex-col w-full items-center rounded-3xl">
            <div>
                <Link href={`/detail?id=${id}`}>
                    <h1 className="font-pacifico text-3xl text-color1 p-1">{name}</h1>
                </Link>
            </div>

            <div className='flex flex-row w-full rounded-3x1 px-4 justify-around'>

                <div className="w-60 h-32">
                    <img src={image} alt={name} className="w-full h-full object-cover rounded-3xl" />
                </div>

                <div className='flex flex-col items-center justify-around'>
                    <button onClick={notify}>
                        <PlusIcon className="h-10 w-10 text-color1" />
                    </button>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        toastOptions={{
                            // Define default options
                            className: '',
                            duration: 1000,
                            style: {
                              background: '#363636',
                              color: '#fff',
                            },
                        
                            // Default options for specific types
                            success: {
                              duration: 1000,
                              theme: {
                                primary: 'green',
                                secondary: 'black',
                              },
                            },
                          }}
                    />
                    <p className="text-pacifico text-2xl text-color1">${price}</p>
                </div>
            </div>

            <div>
                <p className="px-4 py-2 text-color2 font-josefin text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;