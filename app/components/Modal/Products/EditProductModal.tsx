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
import { Product } from "@/type";
import isErrorResponse from "@/app/CatchError/CatchError";
import UploadButtonPage from "../../upload-button/UploadButtonPage";
interface FormData {
  name: string;
  discount: number;
  category: string;
  brand: string;
  description: string;
  price: number;
  countInStock: number;
  images: string[];
}

export default function EditProductModal({
  data,
  isChanged,
  setIsChanged,
  title,
  isOpen,
  setIsOpen,
  icon: IconComponent,
  iconInfo,
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
  const useProductModal = useModal();
  const initialImages = data
    ? data?.images.map((image) => {
        return { fileUrl: image, fileKey: "some-key" };
      })
    : [];

  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >(initialImages);
  const [loading, setLoading] = useState(() => images.length === 0 || false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: data?.name,
      discount: data?.discount,
      category: data?.category,
      description: data?.description,
      price: data?.price,
      countInStock: data?.countInStock,
      brand: data?.brand,
      images: data?.images,
    },
  });

  const onSubmit = async (d: FormData) => {
    console.log(d);
    if (d) {
      try {
        setIsLoading(true);

        const response = await axios.put(
          `https://ecco-two.vercel.app/api/product?id=${data?.id}`,
          {
            name: d.name,
            category: d.category,
            description: d.description,
            price: Number(d.price),
            countInStock: Number(d.countInStock),
            brand: d.brand,
            discount: d.discount,
            images: images.map((image) => {
              return image.fileUrl;
            }),
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
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            type="number" // Change the input type to "number"
            id="discount"
            className="col-span-3"
            {...register("discount", {
              required: "Discount is required",
              valueAsNumber: true, // Ensure the value is treated as a number
              min: 0, // Add validation for minimum value if needed
            })}
          />
          {errors.discount && (
            <span className="text-red-500 w-full">
              {errors.discount.message as string}
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

  const handleCloseModal = () => {
    reset();
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
