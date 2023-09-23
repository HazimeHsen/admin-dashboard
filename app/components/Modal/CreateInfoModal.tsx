import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/ui/input";
import { IconType } from "react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import LoadingSvg from "../Loading/Loading";
import Modal from "./Modal";
import useModal from "@/app/hooks/editModal";
import useDeleteModal from "@/app/hooks/deleteModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { User } from "@/type";
import useCreateModal from "@/app/hooks/CreateModal";

export default function CreateModal({
  title,
  body,
  bodyTitle,
}: {
  bodyTitle: string;
  title: string;
  body: React.ReactElement;
}) {
  const createModal = useCreateModal();

  const toggle = () => {
    if (createModal.isOpen) {
      createModal.onClose();
    } else {
      createModal.onOpen();
    }
  };

  return (
    <Modal
      buttonTitle={bodyTitle}
      isOpen={createModal.isOpen}
      setIsOpen={toggle}
      title={title}
      body={body}
      variant="outline"
    />
  );
}
