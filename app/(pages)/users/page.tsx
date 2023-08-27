"use client";
import Table from "@/app/components/Table/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/users`);
        if (response.data) {
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getUsers();
  }, []);
  return (
    <ClientOnly>
      <Table Loading={isLoading} data={data} />
    </ClientOnly>
  );
};

export default page;
