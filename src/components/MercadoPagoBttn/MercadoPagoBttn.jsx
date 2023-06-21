import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function MercadoPagoBttn({ product }) {
  const [url, setUrl] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const generateLink = async () => {
      try {
        const { data: preference } = await axios.post(
          "/api/MercadoPago/checkout",
          {
            product, 
          }
        );
        setUrl(preference.url);
      } catch (error) {
        console.log(error);
      }
    };
    generateLink();
  }, []);

  const handleBttnClick = (e) => {
    e.preventDefault();
    router.push(url);
  };
  return (
    <div>
      <button
        onClick={handleBttnClick}
        className="mt-4 px-4 py-2 w-40 h-12 bg-color1 text-color3 font-bold rounded-lg hover:bg-color2 hover:text-white transition duration-300"
      >
        Pagar
      </button>
    </div>
  );
}
