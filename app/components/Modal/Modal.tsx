import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { IconType } from "react-icons";
import { Button } from "../ui/button";

export default function Modal({
  body,
  ToDelete,
  isOpen,
  setIsOpen,
  title,
  icon: IconComponent,
}: {
  body?: React.ReactElement;
  ToDelete: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon: IconType;
}) {
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
        <DialogTitle>{title}</DialogTitle>
        {body}
      </DialogContent>
    </Dialog>
  );
}
