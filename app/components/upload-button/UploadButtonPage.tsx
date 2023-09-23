"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
interface Files {
  fileUrl: string;
  fileKey: string;
}
interface UploadButtonPageProps {
  images: Files[];
  setImages: React.Dispatch<React.SetStateAction<Files[]>>; // Use React.Dispatch here
  setLoading: (arg0: boolean) => void;
  type: "userImage" | "productImages";
}
const UploadButtonPage: React.FC<UploadButtonPageProps> = ({
  images,
  setImages,
  setLoading,
  type,
}) => {
  const imgList = (
    <>
      <ul className="w-fit">
        {images.map((img) => (
          <li
            key={img.fileUrl}
            className="my-2 border border-gray-500 p-2 rounded-lg">
            <Image src={img.fileUrl} width={60} height={60} alt="logo" />
          </li>
        ))}
      </ul>
    </>
  );
  return (
    <div className="flex flex-col justify-start items-start">
      <UploadButton
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        endpoint={type}
        onClientUploadComplete={(res) => {
          if (res) {
            setLoading(false);
            setImages(res);
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </div>
  );
};
export default UploadButtonPage;
