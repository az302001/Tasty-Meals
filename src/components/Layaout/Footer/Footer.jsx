import React from 'react'
import Image from "next/image";
import Instagram from "@/assets/instagram.svg";
import Facebook from "@/assets/facebook.svg";
import Whatsapp from "@/assets/whatsapp.svg";

const Footer = () => {
  return (
    <div className='flex justify-evenly w-full bottom-0 left-0 bg-color3 w-full p-4 border-t-2 border-color1'>
      <div name="facebook-logo" className="w-8 h-8">
        <Image src={Facebook} alt={"facebook"}></Image>
      </div>
      <div name="instagram-logo" className="w-8 h-8">
        <Image src={Instagram} alt={"instagram"}></Image>
      </div>
      <div name="whatsapp-logo" className="w-8 h-8">
        <Image src={Whatsapp} alt={"whatsapp"}></Image>
      </div>
    </div>
  )
}

export default Footer;