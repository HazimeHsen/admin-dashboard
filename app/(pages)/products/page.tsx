"use client";
import DataTable from "./Table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClientOnly from "@/app/components/ClientOnly";
import useCreateModal from "@/app/hooks/CreateModal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import LoadingSvg from "@/app/components/Loading/Loading";
import CreateModal from "@/app/components/Modal/CreateInfoModal";
import isErrorResponse from "@/app/CatchError/CatchError";
import { Product } from "@/type";
import UploadButtonPage from "@/app/components/upload-button/UploadButtonPage";

interface FormData {
  name: string;
  brand: string;
  description: string;
  category: string;
  discount: number;
  price: number;
  countInStock: number;
  images: FileList;
}

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/product`);
        if (response.data) {
          setData(response.data);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    getProducts();
  }, [isChanged]);

  const createModal = useCreateModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(() => images.length === 0 || false);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    if (data) {
      try {
        const response = await axios.post(`http://localhost:3000/api/product`, {
          name: data.name,
          brand: data.brand,
          description: data.description,
          category: data.category,
          discount: Number(data.discount),
          price: Number(data.price),
          countInStock: Number(data.countInStock),
          images: images.map((image) => {
            return image.fileUrl;
          }),
        });

        if (response.data) {
          setIsChanged(!isChanged);
          setCreateLoading(false);
          toast.success(response.data.message);
          createModal.onClose();
        }
      } catch (error) {
        if (isErrorResponse(error)) {
          toast.error(`Error Updating: ${error.message}`);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  const editBody = (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-1 py-4">
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
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Input
            type="text"
            id="category"
            className="col-span-3"
            {...register("category", {
              required: "Category is required",
            })}
          />
          {errors.category && (
            <span className="text-red-500 w-full">
              {errors.category.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="discount" className="text-right">
            Discount
          </Label>
          <Input
            type="number"
            id="discount"
            className="col-span-3"
            {...register("discount", {
              required: "Discount is required",
            })}
          />
          {errors.discount && (
            <span className="text-red-500 w-full">
              {errors.discount.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="brand" className="text-right">
            Brand
          </Label>
          <Input
            type="text"
            id="brand"
            className="col-span-3"
            {...register("brand", {
              required: "Brand is required",
            })}
          />
          {errors.brand && (
            <span className="text-red-500 w-full">
              {errors.brand.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            type="text"
            id="description"
            className="col-span-3"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-red-500 w-full">
              {errors.description.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            type="number"
            id="price"
            className="col-span-3"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: 0,
            })}
          />
          {errors.price && (
            <span className="text-red-500 w-full">
              {errors.price.message as string}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="countInStock" className="text-right">
            CountInStock
          </Label>
          <Input
            type="number"
            id="countInStock"
            className="col-span-3"
            {...register("countInStock", {
              required: "CountInStock is required",
              valueAsNumber: true,
              min: 0,
            })}
          />
          {errors.countInStock && (
            <span className="text-red-500 w-full">
              {errors.countInStock.message as string}
            </span>
          )}
        </div>{" "}
        <div className="">
          <Label htmlFor="image" className="text-right">
            Image
          </Label>
          <div className="relative my-3 w-full">
            <UploadButtonPage
              type="productImages"
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
          <h1 className="my-5 text-2xl font-bold underline ">
            Products Table:{" "}
          </h1>
          <CreateModal
            bodyTitle="Create Product"
            body={editBody}
            title="Create New Product"
          />
        </div>
        <DataTable
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
