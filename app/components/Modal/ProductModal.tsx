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
import { Product } from "@/type";
import isErrorResponse from "@/app/CatchError/CatchError";
interface FormData {
  name: string;
  category: string;
  price: number;
  countInStock: number;
  images: FileList;
}

export default function ProductModal({
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
  data: Product;
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
  const [images, setImages] = useState(data.images ?? []); // Initialize with existing images
  const [files, setFiles] = useState<FileList>();
  const useProductModal = useModal();
  const useDelete = useDeleteModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = e.target.files;

      // Create an array of temporary URLs for the selected image files
      const imageUrls = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)
      );

      setImages(imageUrls);
      setFiles(selectedFiles);
    }
  };

  const ProductDelete = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/api/product?id=${id}`
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
        if (!files) return;

        const newImages: string[] = [];

        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const imageData = new FormData();
          imageData.append(`file`, file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: imageData,
          });

          if (!res.ok) {
            throw new Error(await res.text());
          }

          const responseData = await res.json();

          if (!responseData.path) {
            throw new Error("Invalid response data");
          }

          const pathParts = responseData.path.split("\\");

          const filename = pathParts[pathParts.length - 1];
          newImages.push(`/images/${filename}`);
        }
        console.log(newImages);

        setImages(newImages);

        const response = await axios.put(
          `http://localhost:3000/api/product?id=${id}`,
          {
            name: data.name,
            category: data.category,
            price: Number(data.price),
            countInStock: Number(data.countInStock),
            images: newImages,
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
    }
  };

  const editBody = (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            type="number" // Change the input type to "number"
            id="price"
            className="col-span-3"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true, // Ensure the value is treated as a number
              min: 0, // Add validation for minimum value if needed
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
            type="number" // Change the input type to "number"
            id="countInStock"
            className="col-span-3"
            {...register("countInStock", {
              required: "CountInStock is required",
              valueAsNumber: true, // Ensure the value is treated as a number
              min: 0, // Add validation for minimum value if needed
            })}
          />
          {errors.countInStock && (
            <span className="text-red-500 w-full">
              {errors.countInStock.message as string}
            </span>
          )}
        </div>{" "}
        <div className="">
          <Label htmlFor="images" className="text-right">
            Images
          </Label>
          <Input
            type="file"
            id="images"
            className="col-span-3"
            multiple // Allow multiple file selection
            onChange={handleImageChange}
          />
          <div className="flex flex-wrap gap-x-4">
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                width={100}
                height={100}
                src={imageUrl}
                alt={`Product Image ${index}`}
                className="col-span-3 my-2 rounded-full w-[60px] h-[60px] object-contain"
              />
            ))}
          </div>
          {errors.images && (
            <span className="text-red-500 w-full">
              {errors.images.message as string}
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
        Are You Sure You Want To Delete This Product
      </div>
      <Button
        disabled={isLoading}
        className={`relative ${
          isLoading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } mt-5 bg-red-600 hover:bg-red-700 text-white w-full`}
        onClick={() => ProductDelete(id)}>
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
