"use client";
import DataTable from "./Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
import useCreateModal from "@/app/hooks/CreateModal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import isErrorResponse from "@/app/CatchError/CatchError";
import { Order } from "@/type";

interface FormData {
  paid: string;
  delivered: string;
}

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/orders`);
        if (response.data) {
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getOrders();
  }, [isChanged]);

  return (
    <ClientOnly>
      <div className={`px-3 mt-10`}>
        <div className="w-full flex items-center justify-between px-4">
          <h1 className="my-5 text-2xl font-bold underline ">
            Products Table:{" "}
          </h1>
        </div>
        <DataTable
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          Loading={isLoading}
          data={data}
        />
      </div>
    </ClientOnly>
  );
};

export default page;
