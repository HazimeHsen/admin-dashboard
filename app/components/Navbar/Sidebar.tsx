"use client";
import Image from "next/image";
import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "/images/Chart_fill.png" },
    { title: "Inbox", src: "/images/Chat.png" },
    { title: "Accounts", src: "/images/User.png", gap: true },
    { title: "Schedule ", src: "/images/Calendar.png" },
    { title: "Search", src: "/images/Search.png" },
    { title: "Analytics", src: "/images/Chart.png" },
    { title: "Files ", src: "/images/Folder.png", gap: true },
    { title: "Setting", src: "/images/Setting.png" },
  ];

  return (
    <div className="z-50">
      <div className="md:flex hidden z-50">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-gray-700 z-50 h-screen p-5  pt-8 relative duration-300`}>
          <Image
            width={150}
            height={150}
            alt=""
            src="/images/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <Image
              width={70}
              height={70}
              alt=""
              src="/images/logo.png"
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}>
              Admin Panel
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex p-2 cursor-pointer hover:bg-light-white text-white hover:bg-gray-500 rounded-lg text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}>
                <img alt="" src={Menu.src} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className="md:hidden flex h-[30px]">
          <img
            alt=""
            src="/images/control.png"
            className={`absolute cursor-pointer top-4 left-4 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div
            className={` ${
              open ? "left-0" : "-left-full"
            } bg-gray-700 h-screen p-5  pt-8 w-[300px]  duration-300 absolute top-0 -left-full`}>
            <img
              alt=""
              src="/images/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <Image
                width={70}
                height={70}
                alt=""
                src="/images/logo.png"
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}>
                Admin Panel
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex p-2 cursor-pointer hover:bg-light-white text-white hover:bg-gray-500 rounded-lg text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}>
                  <img alt="" src={Menu.src} />
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
