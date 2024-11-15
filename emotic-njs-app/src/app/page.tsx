"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  const [logo, setLogo] = useState("/logoDarkMode.svg");

  useEffect(() => {
    const updateLogo = () => {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setLogo(darkMode ? "/logoDarkMode.svg" : "/logoLightMode.svg");
    };

    updateLogo();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateLogo);

    return () => {
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", updateLogo);
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center bg-lightBackground-500 dark:bg-darkBackground-500">
      <div className="justify-center mt-[15%] font-montserrat font-extralight text-lightText-500 dark:text-darkText-500">
        <div className="flex items-center justify-center">
          <p className="text-[100px]">EMOTIC</p>
          <a href="" target="_blank">
            <Image src={logo} className="h-20 w-20 ml-4" alt="EMOTIC logo" width={80} height={80} />
          </a>
        </div>
        <div className="text-[30px] -mt-4">
          EEG Monitoring of Thoughts and Individual Conditions
        </div>
      </div>
    </div>
  );
}
