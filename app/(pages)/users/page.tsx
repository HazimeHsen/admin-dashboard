import Table from "@/app/components/Table/Table";
import axios from "axios";
import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
const page = async () => {
  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const data = await getUsers();
  console.log(data);
  return (
    <ClientOnly>
      <Table data={data} />
    </ClientOnly>
  );
};

export default page;
