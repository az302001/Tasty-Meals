import React from "react";
import Image from "next/image";
import Instagram from "@/assets/instagram.svg";
import Facebook from "@/assets/facebook.svg";
import Whatsapp from "@/assets/whatsapp.svg";
import Link from "next/link";

const Footer = () => {
  const handleLinkClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex justify-evenly w-full bottom-0 left-0 bg-color3 h-full p-4 border-t-2 border-color1">
      <section className="w-3/4 flex justify-evenly">
        <div
          name="facebook-logo"
          className="w-8 h-8 cursor-pointer"
          onClick={() => handleLinkClick("https://facebook.com")}
        >
          <Image src={Facebook} alt="facebook" height={35} width={35} />
        </div>
        <div
          name="instagram-logo"
          className="w-8 h-8 cursor-pointer"
          onClick={() => handleLinkClick("https://instagram.com")}
        >
          <Image src={Instagram} alt="instagram" height={35} width={35} />
        </div>
        <div
          name="whatsapp-logo"
          className="w-8 h-8 cursor-pointer"
          onClick={() => handleLinkClick("https://whatsapp.com")}
        >
          <Image src={Whatsapp} alt="whatsapp" height={35} width={35} />
        </div>
      </section>
    </div>
  );
};

export default Footer;
