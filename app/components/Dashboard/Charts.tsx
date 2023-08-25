"use client";
import { ChartData, ChartOptions } from "chart.js";
import { Chart } from "primereact/chart";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "@/layout/context/layoutcontext";
import type { ChartDataState, ChartOptionsState } from "@/types/types";
import axios from "axios";
import { Order, Product } from "@/type";
import { Separator } from "../ui/separator";
const ChartDemo = () => {
  const [options, setOptions] = useState<ChartOptionsState>({});
  const [data, setChartData] = useState<ChartDataState>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isFetched2, setIsFetched2] = useState<boolean>(false);
  const { layoutConfig } = useContext(LayoutContext);

  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/orders`);
      if (response.data) {
        setOrders(response.data);
        if (orders) {
          setIsFetched(true);
        }

        console.log(response.data);
        console.log(orders);

        return response.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/product");
      console.log(data);
      if (data) {
        setProducts(data);
        setIsFetched2(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let categoryData: string[] = [];
  products.map((item) => {
    if (!categoryData.includes(item.category)) {
      categoryData.push(item.category);
    }
  });

  useEffect(() => {
    getProducts();
    getOrders();

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor =
      documentStyle.getPropertyValue("--text-color") || "#495057";
    const textColorSecondary =
      documentStyle.getPropertyValue("--text-color-secondary") || "#6c757d";
    const surfaceBorder =
      documentStyle.getPropertyValue("--surface-border") || "#dfe7ef";
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
          backgroundColor:
            documentStyle.getPropertyValue("--primary-500") || "#6366f1",
          borderColor:
            documentStyle.getPropertyValue("--primary-500") || "#6366f1",
          data: currentBarData,
        },
        {
          label: "Last Year",
          backgroundColor:
            documentStyle.getPropertyValue("--primary-200") || "#bcbdf9",
          borderColor:
            documentStyle.getPropertyValue("--primary-200") || "#bcbdf9",
          data: pastBarData,
        },
      ],
    };

    const barOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: "500",
            },
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
      },
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
        },
      ],
    };

    const pieOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };

    const data: number[] = [];

    for (let i = 0; i < 12; i++) {
      data.push(0);
    }

    orders.forEach((order) => {
      const orderMonth = new Date(order?.createdAt).getMonth(); // Assuming date property is present in the order object
      data[orderMonth] += 1; // Increment the count for the corresponding month
    });

    const lineData: ChartData = {
      labels: months,
      datasets: [
        {
          label: "Sales",
          data: data,
          fill: false,
          backgroundColor:
            documentStyle.getPropertyValue("--primary-500") || "#6366f1",
          borderColor:
            documentStyle.getPropertyValue("--primary-500") || "#6366f1",
          tension: 0.4,
        },
      ],
    };

    const lineOptions: ChartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
          border: {
            display: false,
          },
        },
      },
    };

    setOptions({
      barOptions,
      pieOptions,
      lineOptions,
    });
    setChartData({
      barData,
      pieData,
      lineData,
    });
  }, [layoutConfig, isFetched, isFetched2]);

  return (
    <div className="grid p-fluid">
      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Linear Chart</h5>
          <Chart
            type="line"
            data={data.lineData}
            options={options.lineOptions}></Chart>
        </div>
      </div>
      <div className="my-10">
        <Separator />
      </div>
      <div className="col-12 xl:col-6">
        <div className="card">
          <h5>Bar Chart</h5>
          <Chart
            type="bar"
            data={data.barData}
            options={options.barOptions}></Chart>
        </div>
      </div>
      <div className="my-10">
        <Separator />
      </div>

      <div className="">
        <div className="card flex flex-col items-center">
          <h5 className="text-left w-full">Doughnut Chart</h5>
          <Chart
            type="doughnut"
            data={data.pieData}
            options={options.pieOptions}></Chart>
        </div>
      </div>
    </div>
  );
};

export default ChartDemo;
