"use client";
import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Order, Product, User } from "@/type";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteModal from "@/app/hooks/deleteModal";
import LoadingSvg from "@/app/components/Loading/Loading";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ColDef } from "ag-grid-community";
import useEditModal from "@/app/hooks/editModal";
import EditOrderModal from "@/app/components/Modal/Orders/EditProductModal";
import DeleteOrderModal from "@/app/components/Modal/Orders/DeleteProductModal";

function DataTable({
  user,
  orders,
  Loading,
  isChanged,
  setIsChanged,
}: {
  user: User[];
  orders: Order[];
  Loading: boolean;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const useEdit = useEditModal();
  const useDelete = useDeleteModal();
  const [updateModalData, setUpdateModalData] = useState<Order | null>(null);
  const [deleteModalData, setDeleteModalData] = useState<Order | null>(null);
  const gridRef = useRef<AgGridReact>(null);

  const openUpdateModal = (d: Order) => {
    setUpdateModalData(d);
    if (useEdit.isOpen) {
      useEdit.onClose();
    } else {
      useEdit.onOpen();
    }
  };
  const openDeleteModal = (d: Order) => {
    setDeleteModalData(d);
    if (useDelete.isOpen) {
      useDelete.onClose();
    } else {
      useDelete.onOpen();
    }
  };

  const columnDefs: ColDef[] = [
    {
      headerName: "Id",
      resizable: true,
      sortable: true,
      field: "id",
    },
    {
      headerName: "Username",
      resizable: true,
      sortable: true,
      cellRenderer: (params: Params) => {
        const username =
          user && user.length
            ? user.find((x) => x.id === params.data.userId)?.name || ""
            : "";
        return <div>{username}</div>;
      },
    },
    {
      headerName: "TotalCost",
      resizable: true,
      sortable: true,
      field: "totalCost",
    },
    {
      headerName: "Paid",
      resizable: true,
      sortable: true,
      field: "isPaid",
      cellEditor: "agCheckboxCellEditor",
    },
    {
      headerName: "Delivered",
      resizable: true,
      sortable: true,
      field: "isDelivered",
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
            <EditOrderModal
              data={updateModalData}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              isOpen={useEdit.isOpen}
              setIsOpen={() => openUpdateModal(params.data)}
              icon={BiEdit}
              title="Edit Order"
              iconInfo="text-black"
            />
          </div>
          <div className="mr-2 cursor-pointer">
            <DeleteOrderModal
              data={deleteModalData}
              isChanged={isChanged}
              setIsChanged={setIsChanged}
              isOpen={useDelete.isOpen}
              setIsOpen={() => openDeleteModal(params.data)}
              icon={AiTwotoneDelete}
              iconInfo={"text-red-600 hover:text-red-800"}
              title="Delete Order"
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
            rowData={orders}
            alwaysShowHorizontalScroll
            className="h-full"
            pagination
            paginationPageSize={5}
            rowHeight={45}
            headerHeight={45}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
