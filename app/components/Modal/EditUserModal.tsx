import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import LoadingSvg from "../Loading/Loading";
import Modal from "./Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User } from "@/type";
import UploadButtonPage from "../upload-button/UploadButtonPage";
import useModal from "@/app/hooks/useModal";
interface FormData {
  name: string;
  email: string;
}

export default function EditUserModal({
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
  const initialImages = data?.image
    ? [{ fileUrl: data.image, fileKey: "some-key" }]
    : [];

  const [defaultName, setDefaultName] = useState("");
  const [defaultEmail, setDefaultEmail] = useState("");
  useEffect(() => {
    if (data) {
      setDefaultName(data.name || "");
      setDefaultEmail(data.email || "");
    } else {
      // Handle the case when data is null, if needed
      setDefaultName("");
      setDefaultEmail("");
    }
  }, [data]);

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
  } = useForm<FormData>();

  const onSubmit = async (d: FormData) => {
    if (d) {
      try {
        setIsLoading(true);

        const response = await axios.put(
          `http://localhost:3000/api/users?id=${data?.id}`,
          {
            name: d.name,
            email: d.email,
            image: images[0] ? images[0].fileUrl : "/images/placeholder.jpg",
          }
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
    }
  };
  const handleCloseModal = () => {
    reset();
    setIsOpen();
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
            defaultValue={defaultName}
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
            defaultValue={defaultEmail}
          />
          {errors.email && (
            <span className="text-red-500 w-full">
              {errors.email.message as string}
            </span>
          )}
        </div>
        <div className="">
          <div className="">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <div className="relative my-3 w-full">
              <UploadButtonPage
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
          isLoading || loading ? "disabled:cursor-not-allowed bg-gray-800 " : ""
        } w-full`}
        type="submit">
        {isLoading ? <LoadingSvg inBox /> : "Submit"}
      </Button>
    </form>
  );

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
