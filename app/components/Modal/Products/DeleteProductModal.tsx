import React, { useState } from "react";
import { IconType } from "react-icons";
import { Button } from "../../ui/button";
import LoadingSvg from "../../Loading/Loading";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Product, User } from "@/type";

export default function DeleteProductModal({
  data,
  isChanged,
  setIsChanged,
  title,
  isOpen,
  iconInfo,
  setIsOpen,
  icon: IconComponent,
}: {
  data: Product | null;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon: IconType;
  iconInfo: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const ProductDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `https://ecco-two.vercel.app/api/product?id=${data?.id}`
      );
      if (response.data) {
        setIsChanged(!isChanged);
        setIsLoading(false);
        toast.success(response.data.message);
        setIsOpen();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const deleteBody = (
    <div>
      <div className="text-red-600 font-semibold">
        Are You Sure You Want To Delete This Product
      </div>
      <Button
        disabled={isLoading}
        className={`relative ${
          isLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } mt-5 bg-red-600 hover:bg-red-700 text-white w-full`}
        onClick={() => ProductDelete()}>
        {isLoading ? <LoadingSvg inBox /> : "Delete"}
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        icon={IconComponent}
        iconInfo={iconInfo}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        body={deleteBody}
      />
    </div>
  );
}
