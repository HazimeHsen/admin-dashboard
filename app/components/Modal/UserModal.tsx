import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
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

export default function UserModal({
  id,
  ToDelete,
  isOpen,
  setIsOpen,
  onsubmit,
  icon: IconComponent,
  iconColor,
}: {
  id: string;
  ToDelete: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  onsubmit: (args: string) => void;
  title: string;
  icon: IconType;
  iconColor?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (data) onsubmit(id);
  };
  const onDelete = () => {
    onsubmit(id);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${ToDelete ? "text-red-600 hover:text-red-800" : ""}`}
          variant="ghost">
          <IconComponent size={25} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>{ToDelete ? "Delete User" : "Edit Product"}</DialogTitle>
        {ToDelete ? (
          <div>
            <div className="text-red-600 font-semibold">
              Are You Sure You Want To Delete This User
            </div>
            <Button
              className="mt-5 bg-red-600 text-white w-full"
              onClick={onDelete}>
              Delete
            </Button>
          </div>
        ) : (
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
                  {...register("image", {
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
        )}
      </DialogContent>
    </Dialog>
  );
}
