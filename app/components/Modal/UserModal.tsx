import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import LoadingSvg from "../Loading/Loading";
import Modal from "./Modal";
interface FormData {
  name: string;
  email: string;
  image: FileList;
}

export default function UserModal({
  title,
  loading,
  id,
  ToDelete,
  isOpen,
  setIsOpen,
  onsubmit,
  icon: IconComponent,
}: {
  loading: boolean;
  id: string;
  ToDelete: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  onsubmit: (args: string) => void;
  title: string;
  icon: IconType;
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
      <Button
        disabled={loading}
        className={`relative ${
          loading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } w-full`}
        type="submit">
        {loading ? <LoadingSvg inBox /> : "Submit"}
      </Button>
    </form>
  );

  const deleteBody = (
    <div>
      <div className="text-red-600 font-semibold">
        Are You Sure You Want To Delete This User
      </div>
      <Button
        disabled={loading}
        className={`relative ${
          loading ? "disabled:cursor-not-allowed bg-red-800 " : ""
        } mt-5 bg-red-600 hover:bg-red-700 text-white w-full`}
        onClick={onDelete}>
        {loading ? <LoadingSvg inBox /> : "Delete"}
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
