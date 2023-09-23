"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/type";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteModal from "@/app/hooks/deleteModal";
import LoadingSvg from "@/app/components/Loading/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ColDef } from "ag-grid-community";
import EditProductModal from "@/app/components/Modal/Products/EditProductModal";
import DeleteProductModal from "@/app/components/Modal/Products/DeleteProductModal";
import useEditModal from "@/app/hooks/editModal";

function DataTable({
  data,
  Loading,
  isChanged,
  setIsChanged,
}: {
  data: Product[];
  Loading: boolean;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const useEdit = useEditModal();
  const useDelete = useDeleteModal();
  const [updateModalData, setUpdateModalData] = useState<Product | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<Product | null>(null);
  const gridRef = useRef<AgGridReact>(null); // Specify the type explicitly

  const openUpdateModal = (d: Product) => {
    setUpdateModalData(d);
    if (useEdit.isOpen) {
      useEdit.onClose();
    } else {
      useEdit.onOpen();
    }
  };

  const openDeleteModal = (d: Product) => {
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
        <div className="flex">
          {params.data.images.map((image: string, index: number) => (
            <Image
              key={index}
              src={image}
              alt="no image"
              width={40}
              height={40}
              className="mt-1 mx-auto w-[35px] h-[35px] object-contain"
            />
          ))}
        </div>
      ),
    },
    {
      headerName: "Name",
      resizable: true,
      sortable: true,
      field: "name",
    },
    {
      headerName: "Category",
      resizable: true,
      sortable: true,
      field: "category",
    },
    {
      headerName: "Price",
      resizable: true,
      sortable: true,
      field: "price",
    },
    {
      headerName: "Count In Stock",
      resizable: true,
      sortable: true,
      field: "countInStock",
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
            <EditProductModal
              data={updateModalData}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              isOpen={useEdit.isOpen}
              setIsOpen={() => openUpdateModal(params.data)}
              icon={BiEdit}
              title="Edit User"
              iconInfo="text-black"
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <DeleteProductModal
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
      className={` w-full mx-auto block h-[350px] px-2 transition-all duration-300 -z-10 `}>
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
            rowHeight={45}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
