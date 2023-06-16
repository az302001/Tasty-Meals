import React from "react";
import styles from "@/components/Loader/loader.module.css";

const index = () => {
  return (
    // <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
    //   <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    // </div>
    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
      <span className={styles.loader}></span>
    </div>
  );
};

export default index;
