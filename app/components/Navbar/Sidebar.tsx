"use client";
import useSideBarModal from "@/app/hooks/useSideBar";
import Image from "next/image";
import Link from "next/link";
const Sidebar = () => {
  const useSideBar = useSideBarModal();
  const toggle = () => {
    if (useSideBar.isOpen) {
      useSideBar.onClose();
    } else {
      useSideBar.onOpen();
    }
  };
  const Menus = [
    { title: "Dashboard", src: "/images/Folder.png", href: "/" },
    { title: "Users", src: "/images/User.png", href: "/users", gap: true },
    { title: "Products", src: "/images/Chat.png", href: "/products" },
    { title: "Schedule ", src: "/images/Calendar.png", href: "/" },
    { title: "Search", src: "/images/Search.png", href: "/" },
    { title: "Analytics", src: "/images/Chart.png", href: "/" },
  ];

  return (
    <div
      className={`z-50 duration-300 transition-all ${
        useSideBar.isOpen ? "mr-72" : "mr-20"
      }`}>
      <div className="md:flex hidden z-50">
        <div
          className={` ${
            useSideBar.isOpen ? "w-72" : "w-20 "
          } bg-gray-700 z-50 h-screen p-5 pt-8 fixed top-0 left-0 duration-300`}>
          <Image
            width={150}
            height={150}
            alt=""
            src="/images/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!useSideBar.isOpen && "rotate-180"}`}
            onClick={toggle}
          />
          <div className="flex gap-x-4 items-center">
            <Image
              width={70}
              height={70}
              alt=""
              src="/images/logo.png"
              className={`cursor-pointer duration-500 ${
                useSideBar.isOpen && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !useSideBar.isOpen && "scale-0"
              }`}>
              Admin Panel
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li key={index}>
                <Link
                  className={`flex p-2 cursor-pointer hover:bg-light-white text-white hover:bg-gray-500 rounded-lg text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
                  } `}
                  href={Menu.href}>
                  <img alt="" src={Menu.src} />
                  <span
                    className={`${
                      !useSideBar.isOpen && "hidden"
                    } origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </Link>
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
           border-2 rounded-full  ${!useSideBar.isOpen && "rotate-180"}`}
            onClick={toggle}
          />
          <div
            className={` ${
              useSideBar.isOpen ? "left-0" : "-left-full"
            } bg-gray-700 h-screen p-5  pt-8 w-[300px]  duration-300 fixed top-0 -left-full`}>
            <img
              alt=""
              src="/images/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!useSideBar.isOpen && "rotate-180"}`}
              onClick={toggle}
            />
            <div className="flex gap-x-4 items-center">
              <Image
                width={70}
                height={70}
                alt=""
                src="/images/logo.png"
                className={`cursor-pointer duration-500 ${
                  useSideBar.isOpen && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !useSideBar.isOpen && "scale-0"
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
                    className={`${
                      !useSideBar.isOpen && "hidden"
                    } origin-left duration-200`}>
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
