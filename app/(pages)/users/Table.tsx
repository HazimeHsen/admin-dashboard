"use client";
import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteModal from "@/app/hooks/deleteModal";
import useModal from "@/app/hooks/useModal";
import LoadingSvg from "@/app/components/Loading/Loading";
import DeleteUserModal from "@/app/components/Modal/DeleteUserModal";
import EditUserModal from "@/app/components/Modal/EditUserModal";
import { User } from "@/type";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ColDef } from "ag-grid-community";

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
  const useUserModal = useModal();
  const useDelete = useDeleteModal();
  const [updateModalData, setUpdateModalData] = useState<User | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<User | null>(null);
  const gridRef = useRef<AgGridReact>(null); // Specify the type explicitly

  const openUpdateModal = (d: User) => {
    setUpdateModalData(d);
    if (useUserModal.isOpen) {
      useUserModal.onClose();
    } else {
      useUserModal.onOpen();
    }
  };

  const openDeleteModal = (d: User) => {
    setDeleteModalData(d);
    if (useDelete.isOpen) {
      useDelete.onClose();
    } else {
      useDelete.onOpen();
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Profile",
      resizable: true,
      sortable: true,
      cellRenderer: (params: Params) => (
        <img
          src={params.data?.image ?? "/images/placeholder.jpg"}
          alt="no image"
          width={40}
          height={40}
          className="rounded-full w-[30px] h-[30px] object-contain"
        />
      ),
    },
    {
      headerName: "Name",
      resizable: true,
      sortable: true,
      field: "name",
    },
    {
      headerName: "Email",
      resizable: true,
      sortable: true,
      field: "email",
    },
    {
      headerName: "Joined",
      resizable: true,
      sortable: true,
      field: "createdAt",
    },
    {
      headerName: "Actions",
      floatingFilter: false,
      filter: false,
      sortable: false,
      editable: false,
      pinned: "right",
      resizable: false,
      rowDrag: false,
      cellRenderer: (params: Params) => (
        <div className="flex items-center justify-center">
          <div className="mr-2 cursor-pointer">
            <EditUserModal
              data={updateModalData}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              isOpen={useUserModal.isOpen}
              setIsOpen={() => openUpdateModal(params.data)}
              icon={BiEdit}
              title="Edit User"
              iconInfo="text-black"
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <DeleteUserModal
              data={deleteModalData}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              isOpen={useDelete.isOpen}
              setIsOpen={() => openDeleteModal(params.data)}
              icon={AiTwotoneDelete}
              iconInfo={"text-red-600 hover:text-red-800"}
              title="Delete User"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`container w-full mx-auto block h-[350px] px-2 transition-all duration-300 -z-10 `}>
      {Loading ? (
        <LoadingSvg />
      ) : (
        <div className="ag-theme-alpine h-full max-w-[1000px] mx-auto">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={data}
            alwaysShowHorizontalScroll
            className="h-full"
            pagination
            paginationPageSize={5}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
