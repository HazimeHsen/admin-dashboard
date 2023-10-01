"use client";
import { ChartData, ChartOptions } from "chart.js";
import { Chart } from "primereact/chart";
import React, { useContext, useEffect, useState, useRef } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import type { ChartDataState, ChartOptionsState } from "@/types/types";
import axios from "axios";
import { Order, Product } from "@/type";
import { Separator } from "../ui/separator";
import useSideBarModal from "@/app/hooks/useSideBar";
import { debounce } from "lodash";

const ChartDemo = () => {
  const useSidBar = useSideBarModal();
  const [data, setChartData] = useState<ChartDataState>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [chartsDimensions, setChartsDimensions] = useState({
    width: 0,
    height: 0,
  });

  const chartsRef = useRef(null);
  const handleResize = (entries: any) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setChartsDimensions({ width, height });
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (chartsRef.current) {
      resizeObserver.observe(chartsRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  let categoryData: string[] = [];
  products.map((item) => {
    if (!categoryData.includes(item.category)) {
      categoryData.push(item.category);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([
          axios.get("https://ecco-two.vercel.app/api/orders"),
          axios.get("https://ecco-two.vercel.app/api/product"),
        ]);

        setOrders(ordersResponse.data);

        setProducts(productsResponse.data);
        setIsFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isFetched || !chartsDimensions.width || !chartsDimensions.height) {
      return;
    }

    const generateBarDataForYear = (year: number, orders: Order[]) => {
      const barData = Array(12).fill(0); // Initialize an array with 12 zeros

      orders.forEach((order) => {
        const orderDate = new Date(order?.createdAt);
        if (orderDate.getFullYear() === year) {
          const orderMonth = orderDate.getMonth();
          barData[orderMonth] += order.totalCost;
        }
      });

      return barData;
    };

    const currentYear = new Date().getFullYear();
    const currentBarData = generateBarDataForYear(currentYear, orders);

    const lastYear = currentYear - 1;
    const pastBarData = generateBarDataForYear(lastYear, orders);
    const barData: ChartData = {
      labels: months,
      datasets: [
        {
          label: "This Year",
          data: currentBarData,
        },
        {
          label: "Last Year",
          data: pastBarData,
        },
      ],
    };

    let categoryData: string[] = [];
    products.map((item) => {
      if (!categoryData.includes(item.category)) {
        categoryData.push(item.category);
      }
    });

    const categoryDataValue: number[] = [];

    for (let i = 0; i < categoryData.length; i++) {
      categoryDataValue.push(0);
    }

    products.forEach((product: Product) => {
      const index = categoryData.indexOf(product.category);
      categoryDataValue[index] += 1;
    });

    const pieData: ChartData = {
      labels: categoryData,

      datasets: [
        {
          data: categoryDataValue,
          fill: true,
        },
      ],
    };

    const data: number[] = [];

    for (let i = 0; i < 12; i++) {
      data.push(0);
    }

    orders.forEach((order) => {
      const orderMonth = new Date(order?.createdAt).getMonth();
      data[orderMonth] += 1;
    });

    const lineData: ChartData = {
      labels: months,
      datasets: [
        {
          label: "Sales",
          data: data,
          fill: false,
          tension: 0.4,
        },
      ],
    };

    setChartData({
      barData,
      pieData,
      lineData,
    });
  }, [isFetched, chartsDimensions]);

  return (
    <div
      id="charts"
      ref={chartsRef}
      className="max-w-full transition-all duration-300">
      <div className={` ${useSidBar.isOpen ? "" : "lg:flex"} w-full `}>
        <div
          className={`max-w-full  ${
            useSidBar.isOpen ? "w-full" : "lg:w-3/4"
          } `}>
          <div className="">
            <h5 className="text-lg font-bold my-5 uppercase">Sales</h5>
            <Chart
              className="max-h-[300px] flex justify-center"
              type="line"
              data={data.lineData}></Chart>
          </div>
        </div>
        <div
          className={`mx-5 ${useSidBar.isOpen ? "hidden" : "lg:block"} hidden`}>
          <Separator className="" orientation="vertical" />
        </div>
        <div
          className={`my-10  ${
            useSidBar.isOpen ? "block" : "lg:hidden"
          } block `}>
          <Separator className="" />
        </div>
        <div
          className={`lg:max-w-full  ${
            useSidBar.isOpen ? "lg:w-full" : "lg:w-1/4"
          } `}>
          <h5 className="text-lg font-bold my-5 uppercase">Categories</h5>
          <div
            className={`flex justify-center  ${
              useSidBar.isOpen ? "" : "lg:mt-14"
            }  h-full`}>
            <Chart
              className="max-w-[200px]"
              type="doughnut"
              data={data.pieData}></Chart>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Separator />
      </div>
      <div className={`max-w-full ${useSidBar.isOpen ? "w-full" : "w-full"}`}>
        <div className="">
          <h5 className="text-lg font-bold my-5 uppercase">
            Comparison between last year and Current year sales
          </h5>
          <Chart
            className="max-h-[300px] flex justify-center"
            type="bar"
            data={data.barData}></Chart>
        </div>
      </div>
      <div className="my-10">
        <Separator />
      </div>
    </div>
  );
};

export default ChartDemo;
