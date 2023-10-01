import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { IconType } from "react-icons";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import LoadingSvg from "../../Loading/Loading";
import Modal from "../Modal";
import useModal from "@/app/hooks/editModal";
import useDeleteModal from "@/app/hooks/deleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Order, Product } from "@/type";
import isErrorResponse from "@/app/CatchError/CatchError";
import UploadButtonPage from "../../upload-button/UploadButtonPage";
import { Checkbox } from "../../ui/checkbox";

export default function EditOrderModal({
  data,
  isChanged,
  setIsChanged,
  title,
  isOpen,
  setIsOpen,
  icon: IconComponent,
  iconInfo,
}: {
  data: Order | null;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon: IconType;
  iconInfo: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(data?.isPaid);
  const [isDelivered, setIsDelivered] = useState(data?.isDelivered);
  const useProductModal = useModal();

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `https://ecco-two.vercel.app/api/orders?id=${data?.id}`,
        {
          paid: isPaid,
          delivered: isDelivered,
        }
      );

      if (response.data) {
        setIsChanged(!isChanged);
        setIsLoading(false);
        toast.success(response.data.message);
        useProductModal.onClose();
      }
    } catch (error) {
      if (isErrorResponse(error)) {
        toast.error(`Error Updating: ${error.message}`);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const editBody = (
    <>
      <div className="grid gap-1 py-4">
        <div className="py-3 flex items-center ">
          <Checkbox
            defaultChecked={isPaid}
            onCheckedChange={(e) => {
              setIsPaid((prev) => !prev);
              console.log(isPaid);
            }}
            id="paid"
            className="mr-2"
          />
          <label
            htmlFor="paid"
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Paid
          </label>
        </div>
        <div className="">
          <Checkbox
            defaultChecked={isDelivered}
            onClick={(e) => {
              setIsDelivered((prev) => !prev);
              console.log(isDelivered);
            }}
            id="delivered"
            className="mr-2"
          />
          <label
            htmlFor="delivered"
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Delivered
          </label>
        </div>
      </div>
      <Button
        onClick={onSubmit}
        disabled={isLoading}
        className={`relative ${
          isLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } w-full`}>
        {isLoading ? <LoadingSvg inBox /> : "Submit"}
      </Button>
    </>
  );

  const handleCloseModal = () => {
    setIsOpen();
  };
  return (
    <div>
      <Modal
        icon={IconComponent}
        isOpen={isOpen}
        setIsOpen={handleCloseModal}
        title={title}
        iconInfo={iconInfo}
        body={editBody}
      />
    </div>
  );
}
