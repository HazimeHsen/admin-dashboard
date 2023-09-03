"use client";
import Table from "@/app/(pages)/users/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
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
  }, [isChanged]);
  return (
    <ClientOnly>
      <div className={`px-3 mt-10`}>
        <h1 className="my-5 ml-5 text-2xl font-bold underline ">
          Users Table:{" "}
        </h1>
        <Table
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
