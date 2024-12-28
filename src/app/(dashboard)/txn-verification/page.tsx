"use client";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { UploadButton } from "@/lib/uploadthing";
import toast from "react-hot-toast";

const TxnVerification = () => {
  return (
    <div className="h-full">
      <header>
        <h1 className="text-3xl font-bold">Verify your transactions</h1>
        <p className="text-sm text-neutral-600 mt-2">
          Upload a screenshot of your transactions
        </p>
      </header>
      <Separator className="my-6" />
      <div className="border min-h-60 flex justify-center items-center">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            toast.success("Upload complete");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error("Failed");
            console.log(error);
          }}
        />
      </div>
    </div>
  );
};

export default TxnVerification;
