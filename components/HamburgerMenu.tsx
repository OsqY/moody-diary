'use client'

import Moody_Logo from "../public/Moody Logo (1)_prev_ui.png"
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillJournalBookmarkFill, BsShare } from "react-icons/bs";
import { TbHistory } from "react-icons/tb"
import { FaHome, FaTasks } from "react-icons/fa"
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const HamburgerMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sideList = [
    {
      icon: <FaHome className="text-2xl" />,
      title: links[0].label,
      href: links[0].href,
    },
    {
      icon: <BsFillJournalBookmarkFill className="text-2xl" />,
      title: links[1].label,
      href: links[1].href,
    },
    {
      icon: <TbHistory className="text-2xl" />,
      title: links[2].label,
      href: links[2].href,
    },
    {
      icon: <FaTasks className="text-2xl" />,
      title: links[3].label,
      href: links[3].href,
    },
  ];

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <nav className="flex w-full items-center justify-between px-6 h-16 bg-gray text-white border-b border-gray-200 z-10">
      <div className="flex items-center">
        <button className="mr-2" aria-label="Open Menu" onClick={handleDrawer}>
          <GiHamburgerMenu className="text-3xl" />
        </button>

        <Image
          src={Moody_Logo}
          width={32}
          height={32}
          alt="Logo"
        />
      </div>

      <div className="h-full w-full px-6 flex items-center justify-end">
        <UserButton />
      </div>

      {isOpen && (
        <div className="z-10 fixed inset-0 transition-opacity">
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black opacity-50"
            tabIndex="0"
          ></div>
        </div>
      )}

      <aside
        className={`text-white transform top-0 left-0 w-64 bg-gray-950 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <span className="flex w-full items-center p-4 border-b">
          <Image
            src={Moody_Logo}
            width={32}
            height={32}
            alt="Logo"
          />
        </span>
        {sideList.map(({ icon, title, href }, index) => {
          return (
            <div key={title}>
              <Link
                href={href}
                key={index}
                className="flex items-center p-4 hover:bg-blue-500 hover:text-white "
              >
                <span className="mr-2">{icon}</span> <span>{title}</span>
              </Link>
            </div>
          );
        })}
      </aside>
    </nav >
  );
};

export default HamburgerMenu;
