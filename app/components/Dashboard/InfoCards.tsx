"use client";
import { User } from "@/type";
import axios from "axios";
import { IconType } from "react-icons";
import React, { useEffect, useState } from "react";
import { AiOutlineUser, AiOutlineStar } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import useSideBarModal from "@/app/hooks/useSideBar";
const InfoCards = () => {
  const useSideBar = useSideBarModal();
  const [userNb, setUserNb] = useState(0);
  const [productNb, setProductNb] = useState(0);
  const [orderNb, setOrderNb] = useState(0);
  const [reviewNb, setReviewNb] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/api/users`);
      if (response.data) {
        setUserNb(response.data.length);
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/api/product`);
      if (response.data) {
        setProductNb(response.data.length);
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/api/orders`);
      if (response.data) {
        setOrderNb(response.data.length);
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const getReview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/api/review`);
      if (response.data) {
        setReviewNb(response.data.length);
        setIsLoading(false);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
    getProducts();
    getOrders();
    getReview();
  }, []);
  return (
    <div className="grid z-10">
      {isLoading ? (
        <div
          className={`-z-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      ) : (
        <div
          className={`-z-10 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`}>
          <Card
            number={userNb}
            title="Users"
            icon={AiOutlineUser}
            subTitle="users"
            iconColor="text-red-600"
            iconBg="bg-red-300"
          />
          <Card
            number={productNb}
            title="Product"
            icon={BiCategory}
            subTitle="products"
            iconColor="text-green-600"
            iconBg="bg-green-300"
          />
          <Card
            number={orderNb}
            title="Orders"
            icon={BsShop}
            subTitle="orders"
            iconColor="text-blue-600"
            iconBg="bg-blue-300"
          />
          <Card
            number={reviewNb}
            title="Reviews"
            icon={AiOutlineStar}
            subTitle="reviews"
            iconColor="text-gray-600"
            iconBg="bg-gray-300"
          />
        </div>
      )}
    </div>
  );
};

export default InfoCards;

const Card = ({
  title,
  subTitle,
  number,
  icon: IconComponent,
  iconBg,
  iconColor,
}: {
  title: string;
  subTitle: string;
  number: number;
  icon: IconType;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <div className="border bg-white shadow-lg py-4 px-6 rounded-lg">
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold text-gray-400">{title}</div>
        <div className={`p-2 ${iconBg} ${iconColor} rounded-lg`}>
          <IconComponent size={25} />
        </div>
      </div>
      <div className="my-3 w-full font-bold">
        {number} {subTitle}
      </div>
    </div>
  );
};
const LoadingCard = () => {
  return (
    <div
      role="status"
      className="animate-pulse z-20 border bg-white shadow-lg py-4 px-6 rounded-lg">
      <div className="flex justify-between items-center w-full">
        <div className="font-semibold text-gray-400">
          <div className="w-10 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <svg
          className="w-8 h-8 text-gray-200 mr-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
      </div>
      <div className="my-3 w-full font-bold">
        <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
