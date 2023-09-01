"use client";
import React, { useEffect, useRef } from "react";
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

function DataTable({ data, Loading }: { data: User[]; Loading: boolean }) {
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
        responsive: useUserModal.isOpen ? true : false,
      });

      table.columns.adjust().responsive.recalc();

      return () => {
        table.destroy(true);
      };
    }
  }, [Loading]);

  const userEdit = (id: string) => {
    useUserModal.onClose();
  };
  const userDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users?id=${id}`
      );
      if (response.data) {
        toast.success(response.data.message);
        useDelete.onClose();
      }
    } catch (error) {
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
    <div className="container w-full mx-auto px-2">
      {Loading ? (
        <div
          className={`absolute ${
            useSideBar.isOpen ? "md:ml-72" : "md:ml-20"
          }  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          id="recipients"
          className="p-8 mt-6 lg:mt-0 rounded overflow-auto bg-white">
          <table
            id="example"
            className="stripe hover overflow-auto"
            style={{ width: "100%", paddingTop: "1em", paddingBottom: "1em" }}
            ref={tableRef}>
            <thead>
              <tr>
                <th data-priority="1">Profile</th>
                <th data-priority="2">Name</th>
                <th data-priority="3">Email</th>
                <th data-priority="4">Joined</th>
                <th data-priority="4">Details</th>
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
                            ToDelete={false}
                            id={d.id}
                            isOpen={useUserModal.isOpen}
                            setIsOpen={toggle1}
                            onsubmit={userEdit}
                            icon={BiEdit}
                            title="Edit User"
                            iconColor="text-black"
                          />
                        </div>
                        <div className="mr-2 cursor-pointer">
                          <Modal
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
