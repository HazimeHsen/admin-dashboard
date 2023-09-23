"use client";
import Table from "@/app/(pages)/users/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
import { Button } from "@/app/components/ui/button";
import CreateModal from "@/app/components/Modal/CreateInfoModal";
import LoadingSvg from "@/app/components/Loading/Loading";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useCreateModal from "@/app/hooks/CreateModal";
import UploadButtonPage from "@/app/components/upload-button/UploadButtonPage";
interface FormData {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState([]);
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(() => images.length === 0 || false);

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

  const createModal = useCreateModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (data) {
      try {
        setCreateLoading(true);

        const response = await axios.post(`http://localhost:3000/api/users`, {
          name: data.name,
          email: data.email,
          password: data.password,
          image: images[0] ? images[0].fileUrl : "/images/placeholder.jpg",
        });
        if (response.data) {
          setIsChanged(!isChanged);
          setCreateLoading(false);
          toast.success(response.data.message);
          createModal.onClose();
        }
      } catch (error) {
        setCreateLoading(false);
        console.log(error);
      }
    }
  };

  const body = (
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
          <Label htmlFor="password" className="text-right">
            Password
          </Label>
          <Input
            type="text"
            id="password"
            className="col-span-3"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <span className="text-red-500 w-full">
              {errors.password.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <div className="relative my-3 w-full">
            <UploadButtonPage
              type="userImage"
              images={images}
              setImages={setImages}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={createLoading}
        className={`relative ${
          createLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } w-full`}
        type="submit">
        {createLoading ? <LoadingSvg inBox /> : "Submit"}
      </Button>
    </form>
  );
  return (
    <ClientOnly>
      <div className={`px-3 mt-10`}>
        <div className="w-full flex items-center justify-between px-4">
          <h1 className="my-5 text-2xl font-bold underline ">Users Table: </h1>
          <CreateModal
            bodyTitle="Create User"
            body={body}
            title="Create New User"
          />
        </div>
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
