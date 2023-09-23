"use client";
import useSideBarModal from "@/app/hooks/useSideBar";
import Image from "next/image";
import Link from "next/link";

const Menus = [
  { title: "Dashboard", src: "/images/Folder.png", href: "/" },
  { title: "Users", src: "/images/User.png", href: "/users", gap: true },
  { title: "Products", src: "/images/Chat.png", href: "/products" },
  { title: "Schedule", src: "/images/Calendar.png", href: "/" },
  { title: "Search", src: "/images/Search.png", href: "/" },
  { title: "Analytics", src: "/images/Chart.png", href: "/" },
];

const Sidebar = () => {
  const useSideBar = useSideBarModal();

  const toggle = () => {
    useSideBar.isOpen ? useSideBar.onClose() : useSideBar.onOpen();
  };

  const sidebarClasses = useSideBar.isOpen ? "md:w-72" : "md:w-20";
  const sidebarHiddenClasses = useSideBar.isOpen ? "left-0" : "-left-full";
  const logoRotationClasses = useSideBar.isOpen ? "rotate-[360deg]" : "";

  return (
    <>
      <div className="mb-10">
        <Image
          width={150}
          height={150}
          alt=""
          src="/images/control.png"
          className={`absolute cursor-pointer left-5 top-5 w-7 border-dark-purple border-2 rounded-full ${
            !useSideBar.isOpen && "rotate-180"
          }`}
          onClick={toggle}
        />
      </div>
      <div
        className={`z-50 duration-300 transition-all ${
          useSideBar.isOpen ? "md:mr-72" : "md:mr-20"
        }`}>
        <div className="block z-50">
          <div
            className={` ${sidebarClasses} w-72 bg-gray-700 z-50 h-screen p-5 pt-8 fixed top-0 md:left-0  ${
              useSideBar.isOpen ? "left-0" : "-left-full"
            } duration-300`}>
            <Image
              width={150}
              height={150}
              alt=""
              src="/images/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full ${
                !useSideBar.isOpen && "rotate-180"
              }`}
              onClick={toggle}
            />

            <div className="flex relative gap-x-4 items-center">
              <Image
                width={70}
                height={70}
                alt=""
                src="/images/logo.png"
                className={`cursor-pointer duration-500 ${logoRotationClasses}`}
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
                    className={`flex p-2 cursor-pointer hover:bg-light-white text-white hover:bg-gray-500 rounded-lg text-sm items-center gap-x-4 ${
                      Menu.gap ? "mt-9" : "mt-2"
                    } ${index === 0 && "bg-light-white"}`}
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
      </div>
    </>
  );
};

export default Sidebar;
