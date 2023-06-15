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
        className="text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800"
      >
        Pagar
      </button>
    </div>
  );
}
