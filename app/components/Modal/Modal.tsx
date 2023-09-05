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
  isOpen,
  setIsOpen,
  title,
  icon: IconComponent,
  iconInfo,
  buttonTitle,
  variant,
}: {
  body?: React.ReactElement;
  buttonTitle?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  icon?: IconType | undefined;
  iconInfo?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={`${iconInfo}`} variant={variant ?? "ghost"}>
          {buttonTitle ?? (IconComponent && <IconComponent size={25} />)}
        </Button>
      </DialogTrigger>
      <DialogContent className="custom-sidebar-style max-h-[500px] sm:max-w-[425px]">
        <DialogTitle>{title}</DialogTitle>
        {body}
      </DialogContent>
    </Dialog>
  );
}
