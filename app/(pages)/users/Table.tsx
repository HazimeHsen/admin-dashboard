"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { User } from "@/type";
import useSideBarModal from "@/app/hooks/useSideBar";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import Modal from "@/app/components/Modal/UserModal";
import useDeleteModal from "@/app/hooks/deleteModal";
import useModal from "@/app/hooks/useModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import LoadingSvg from "@/app/components/Loading/Loading";

function DataTable({
  data,
  Loading,
  isChanged,
  setIsChanged,
}: {
  data: User[];
  Loading: boolean;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(null);
  const useUserModal = useModal();
  const useDelete = useDeleteModal();
  const useSideBar = useSideBarModal();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const $ = require("jquery");
      require("datatables.net");
      require("datatables.net-responsive");

      const table = $(tableRef.current).DataTable({
        responsive: useSideBar.isOpen ? true : false,
      });

      table.columns.adjust().responsive.recalc();

      return () => {
        table.destroy(true);
      };
    }
  }, [Loading, isChanged]);

  const userEdit = (id: string) => {
    useUserModal.onClose();
  };
  const userDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/users?id=${id}`
      );
      if (response.data) {
        setIsChanged(!isChanged);
        setIsLoading(false);
        toast.success(response.data.message);
        useDelete.onClose();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const toggle1 = () => {
    if (useUserModal.isOpen) {
      useUserModal.onClose();
    } else {
      useUserModal.onOpen();
    }
  };
  const toggle2 = () => {
    if (useDelete.isOpen) {
      useDelete.onClose();
    } else {
      useDelete.onOpen();
    }
  };

  return (
    <div
      className={`container w-full mx-auto block px-2 transition-all duration-300 -z-10 `}>
      {Loading ? (
        <LoadingSvg />
      ) : (
        <div
          id="recipients"
          className="p-8 mt-6 lg:mt-0 rounded overflow-auto z-0 bg-white">
          <table
            id="example"
            className="stripe hover z-0 overflow-auto"
            style={{ width: "100%", paddingTop: "1em", paddingBottom: "1em" }}
            ref={tableRef}>
            <thead>
              <tr>
                <th className="z-0" data-priority="1">
                  Profile
                </th>
                <th className="z-0" data-priority="2">
                  Name
                </th>
                <th className="z-0" data-priority="3">
                  Email
                </th>
                <th className="z-0" data-priority="4">
                  Joined
                </th>
                <th className="z-0" data-priority="4">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((d, i) => (
                  <tr key={i}>
                    <td className="!py-[10px] !px-[18px] ">
                      {" "}
                      <Image
                        src={d?.image ?? "/images/placeholder.jpg"}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </td>
                    <td className="!py-[10px] !px-[18px] ">
                      {" "}
                      <div>{d.name}</div>
                    </td>
                    <td className="!py-[10px] !px-[18px]">
                      {" "}
                      <div>{d.email}</div>
                    </td>
                    <td className="!py-[10px] !px-[18px]">
                      <div>{d.createdAt}</div>
                    </td>
                    <td className="!py-[10px] !px-[18px]">
                      <div className="flex items-center justify-center">
                        <div className="mr-2 cursor-pointer">
                          <Modal
                            loading={isLoading}
                            ToDelete={false}
                            id={d.id}
                            isOpen={useUserModal.isOpen}
                            setIsOpen={toggle1}
                            onsubmit={userEdit}
                            icon={BiEdit}
                            title="Edit User"
                          />
                        </div>
                        <div className="mr-2 cursor-pointer">
                          <Modal
                            loading={isLoading}
                            id={d.id}
                            ToDelete
                            onsubmit={userDelete}
                            isOpen={useDelete.isOpen}
                            setIsOpen={toggle2}
                            icon={AiTwotoneDelete}
                            title="Delete User"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable;
