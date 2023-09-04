import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import LoadingSvg from "../Loading/Loading";
import Modal from "./Modal";
import useModal from "@/app/hooks/useModal";
import useDeleteModal from "@/app/hooks/deleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { User } from "@/type";
interface FormData {
  name: string;
  email: string;
  image: FileList;
}

export default function UserModal({
  data,
  isChanged,
  setIsChanged,
  title,
  id,
  ToDelete,
  isOpen,
  setIsOpen,
  icon: IconComponent,
}: {
  data: User;
  isChanged: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  ToDelete: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon: IconType;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(data.image ?? "/images/placeholder.jpg");
  const [file, setFile] = useState<File>();
  const useUserModal = useModal();
  const useDelete = useDeleteModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Create a temporary URL for the selected image file
      const imageUrl = URL.createObjectURL(selectedFile);

      setImage(imageUrl);
      setFile(selectedFile);
    }
  };

  const userDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/users?id=${id}`
      );
      if (response.data) {
        setIsChanged(!isChanged);
        setIsLoading(false);
        toast.success(response.data.message);
        useDelete.onClose();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (data) {
      try {
        setIsLoading(true);
        if (!file) return;

        const imageData = new FormData();
        imageData.set("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: imageData,
        });
        if (!res.ok) throw new Error(await res.text());
        const responseData = await res.json();

        const pathParts = responseData.path.split("\\");

        const filename = pathParts[pathParts.length - 1];

        const newPath = `/images/${filename}`;

        setImage(newPath);
        console.log(image);
        const response = await axios.put(
          `http://localhost:3000/api/users?id=${id}`,
          {
            name: data.name,
            email: data.email,
            image: newPath,
          }
        );
        if (response.data) {
          setIsChanged(!isChanged);
          setIsLoading(false);
          toast.success(response.data.message);
          useUserModal.onClose();
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  const editBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            className="col-span-3"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && (
            <span className="text-red-500 w-full">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            className="col-span-3"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && (
            <span className="text-red-500 w-full">
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <Input
            type="file"
            id="image"
            className="col-span-3"
            onChange={handleImageChange}
          />
          <Image
            width={100}
            height={100}
            src={image}
            alt="User Image"
            className="col-span-3 my-5 rounded-full w-[60px] h-[60px] object-contain"
          />
          {errors.image && (
            <span className="text-red-500 w-full">
              {errors.image.message as string}
            </span>
          )}
        </div>
      </div>
      <Button
        disabled={isLoading}
        className={`relative ${
          isLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } w-full`}
        type="submit">
        {isLoading ? <LoadingSvg inBox /> : "Submit"}
      </Button>
    </form>
  );

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
        onClick={() => userDelete(id)}>
        {isLoading ? <LoadingSvg inBox /> : "Delete"}
      </Button>
    </div>
  );
  return (
    <div>
      {ToDelete ? (
        <Modal
          ToDelete={ToDelete}
          icon={IconComponent}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          body={deleteBody}
        />
      ) : (
        <Modal
          ToDelete={ToDelete}
          icon={IconComponent}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          body={editBody}
        />
      )}
    </div>
  );
}
