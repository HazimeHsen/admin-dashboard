"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
import ProductsTable from "./Table";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://ecco-two.vercel.app/api/product`
        );
        if (response.data) {
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getProducts();
  }, []);
  return (
    <ClientOnly>
      <div className="px-3 mt-10">
        <h1 className="my-5 ml-5 text-2xl font-bold underline ">
          Products Table:{" "}
        </h1>
        <ProductsTable Loading={isLoading} data={data} />
      </div>
    </ClientOnly>
  );
};

export default page;
