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
import { User } from "@/type";

export default function DeleteUserModal({
  data,
  isChanged,
  setIsChanged,
  title,
  isOpen,
  iconInfo,
  setIsOpen,
  icon: IconComponent,
}: {
  data: User | null;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon: IconType;
  iconInfo: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const userDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/users?id=${data?.id}`
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
        Are You Sure You Want To Delete This User
      </div>
      <Button
        disabled={isLoading}
        className={`relative ${
          isLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } mt-5 bg-red-600 hover:bg-red-700 text-white w-full`}
        onClick={userDelete}>
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
