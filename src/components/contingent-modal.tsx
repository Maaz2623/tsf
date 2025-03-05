"use client";
import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { contingentPrice, contingentUpiLink } from "@/constants";
import QRCode from "react-qr-code";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { PackageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const ContingentModal = () => {
  const [contingentGenerator, setContingentGenerator] = useState(false);

  return (
    <>
      <ContingentGenerator
        contingentGenerator={contingentGenerator}
        setContingentGenerator={setContingentGenerator}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="py-3 rounded-lg shadow-md" variant={`outline`}>
            <PackageIcon />
            Buy Contingent
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="">
          <AlertDialogHeader>
            <VisuallyHidden>
              <AlertDialogTitle className="w-full text-center">
                Payment
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </VisuallyHidden>
          </AlertDialogHeader>
          <div className="min-h-40 w-full gap-y-3 flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg relative">
              <h2 className="text-lg font-medium mb-2">
                Scan or Click to Pay{" "}
                <span className="font-bold text-black">₹{contingentPrice}</span>
              </h2>
              <Link href={contingentUpiLink}>
                <div className="relative">
                  <QRCode
                    value={contingentUpiLink}
                    size={150}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    className="rounded-lg"
                  />
                </div>
              </Link>
              <p className="text-sm text-gray-600 mt-2 text-center text-wrap w-3/4">
                Use any upi payments provider to pay the amount
              </p>
              <p className="text-sm font-medium text-green-600 mt-2 text-center w-3/4">
                Note: By purchasing, you get access to all events.
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={() => setContingentGenerator(true)}>
              I have paid
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContingentModal;

const ContingentGenerator = ({
  contingentGenerator,
  setContingentGenerator,
}: {
  contingentGenerator: boolean;
  setContingentGenerator: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [collegeName, setCollegeName] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      console.log("Selected file:", file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <Drawer onOpenChange={setContingentGenerator} open={contingentGenerator}>
      <DrawerContent className="mb-8">
        <DrawerHeader>
          <DrawerTitle className="w-full text-center text-2xl">
            Payment Verification
          </DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="min-h-40 space-y-4 w-full flex flex-col justify-center items-center">
          <div className="w-[300px] space-y-1">
            <Label>University Name</Label>
            <Input
              className=""
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
              placeholder="e.g. Jain College"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-[300px] space-y-4 p-6  border-dotted border-2 rounded-lg">
            {image ? (
              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-center text-lg font-semibold">
                  Payment Screenshot
                </p>
                <div className="relative size-28">
                  <XIcon
                    onClick={() => setImage(null)}
                    className="size-5 absolute -top-1 -right-2 shadow-md bg-white rounded-lg border"
                  />
                  <Image
                    src={image}
                    alt="ss"
                    width={200}
                    height={200}
                    className="aspect-square border shadow-sm rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 text-lg font-medium text-center">
                  Upload payment screenshot for verification
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*" // Allows only image files
                />
                <Button
                  className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  onClick={handleUploadClick}
                >
                  <UploadIcon className="w-5 h-5" />
                  Upload
                </Button>
              </>
            )}
          </div>

          <div className="w-full flex justify-center items-center">
            <Button className="w-[300px]" onClick={() => {}} disabled={!image}>
              Verify
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
