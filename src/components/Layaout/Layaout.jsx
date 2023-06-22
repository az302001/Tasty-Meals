import React from "react";
import Image from "next/image";
import Nadvar from "./Nadvar/Nadvar";
import Footer from "./Footer/Footer";
import BackgroundImage from "@/assets/background.jpg";

const Layaout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative ">
      <div className="sticky top-0 z-10">
        <Nadvar />
      </div>

      <div className="relative z-0">{children}</div>

      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <Image
          src={BackgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority={true}
          style={{ opacity: 0.08 }}
        />
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layaout;
