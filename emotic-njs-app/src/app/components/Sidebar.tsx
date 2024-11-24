"use client";

import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import Image from "next/image";
import { useLogo } from "../hooks/useLogo";

export default function Sidebar() {
  const logo = useLogo();

  return (
    <div className="h-full w-[88px] bg-lightBackground-500 dark:bg-darkBackground-500 flex flex-col items-center py-4 border-r border-lightBorder-500 dark:border-darkBorder-500">
      {/* Home/Logo Icon */}
      <a href="/" target="_blank">
        <Image
          src={logo}
          className="h-12 w-12 my-6 hover:scale-110 transition-transform duration-200"
          alt="EMOTIC logo"
          width={12}
          height={12}
        />
      </a>
      <div className="w-3/4 border-t border-lightBorder-500 dark:border-darkBorder-500 my-4"></div>

      {/* GitHub Icon */}
      <Link
        href="https://github.com/sfu-cmpt340/EMOTIC_g3"
        target="_blank"
        className="text-iconLight-500 dark:text-iconDark-500 my-6 hover:scale-110 transition-transform duration-200"
      >
        <VscGithub size={40} />
      </Link>
    </div>
  );
}
