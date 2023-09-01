import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
interface FormData {
  name: string;
  email: string;
  image: FileList;
}

export default function ProductModal({
  id,
  isOpen,
  setIsOpen,
  onsubmit,
  body,
  icon: IconComponent,
  iconColor,
}: {
  id: string;
  isOpen: boolean;
  setIsOpen: () => void;
  onsubmit: (args: string) => void;
  body?: React.ReactElement;
  title: string;
  icon: IconType;
  iconColor: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>(); // Specify the type parameter

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (data) onsubmit(id);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={iconColor} variant="ghost">
          <IconComponent size={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Edit Product</DialogTitle>
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
                {...control.register("name", { required: "Name is required" })}
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
                {...control.register("image", {
                  required: "Image is required",
                })}
              />
              {errors.image && (
                <span className="text-red-500 w-full">
                  {errors.image.message as string}
                </span>
              )}
            </div>
          </div>
          <Button className="float-right w-full" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
