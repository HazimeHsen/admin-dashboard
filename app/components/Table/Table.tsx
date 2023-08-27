"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "@/type";

function DataTable({ data }: { data: User[] }) {
  const tableRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const $ = require("jquery");
      require("datatables.net");
      require("datatables.net-responsive");

      const table = $(tableRef.current).DataTable({
        responsive: true,
      });

      table.columns.adjust().responsive.recalc();

      return () => {
        table.destroy(true);
      };
    }
  }, []);

  return (
    <div className="container w-full mx-auto px-2">
      <div id="recipients" className="p-8 mt-6 lg:mt-0 rounded  bg-white">
        <table
          id="example"
          className="stripe hover "
          style={{ width: "100%", paddingTop: "1em", paddingBottom: "1em" }}
          ref={tableRef}>
          <thead>
            <tr>
              <th data-priority="1">Profile</th>
              <th data-priority="2">Name</th>
              <th data-priority="3">Email</th>
              <th data-priority="4">Joined</th>
            </tr>
          </thead>
          {data ? (
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
                  </tr>
                ))}
            </tbody>
          ) : null}
        </table>
      </div>
    </div>
  );
}

export default DataTable;
