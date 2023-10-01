"use client";
import DataTable from "./Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
import useCreateModal from "@/app/hooks/CreateModal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import isErrorResponse from "@/app/CatchError/CatchError";
import { Order, User } from "@/type";

interface FormData {
  paid: string;
  delivered: string;
}

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    console.log("hello");
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const [ordersResponse, usersResponse] = await Promise.all([
          axios.get("https://ecco-two.vercel.app/api/orders"),
          axios.get("https://ecco-two.vercel.app/api/users"),
        ]);

        if (ordersResponse.data) {
          setOrders(ordersResponse.data);
        }
        if (usersResponse.data) {
          setUser(usersResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("Something went Wrong.");
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, []);

  return (
    <ClientOnly>
      <div className={`px-3 mt-10`}>
        <div className="w-full flex items-center justify-between px-4">
          <h1 className="my-5 text-2xl font-bold underline ">Orders Table: </h1>
        </div>
        <DataTable
          isChanged={isChanged}
          setIsChanged={setIsChanged}
          Loading={isLoading}
          orders={orders}
          user={user}
        />
      </div>
    </ClientOnly>
  );
};

export default page;
