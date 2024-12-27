import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/transparent-dialog";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

interface MemberRowProps {
  id: string;
  profileImage: string;
  fullName: string;
  email: string;
}

const MemberRow = ({ id, profileImage, fullName, email }: MemberRowProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-start gap-x-2">
      <Dialog>
        <DialogTrigger className="shrink-0">
          <Image
            src={profileImage}
            alt="Profile Image"
            width={100}
            height={100}
            loading="lazy"
            className="size-12 z-40 object-cover object-center cursor-pointer rounded-full border-4 border-white shadow-md"
          />
        </DialogTrigger>
        <DialogContent className="bg-transparent p-0 flex border-none shadow-none justify-center items-center overflow-hidden px-4 md:w-[500px] md:h-[500px]">
          <VisuallyHidden.Root>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </VisuallyHidden.Root>
          <Image
            src={profileImage}
            alt="profile-image"
            width={800}
            height={800}
            className="object-cover object-center rounded-lg shadow-2xl"
          />
        </DialogContent>
      </Dialog>
      <div
        className="hover:underline"
        onClick={() => router.push(`/community/${id}`)}
      >
        <p className="text-base font-medium truncate w-[250px]">{fullName}</p>
        <p className="text-gray-700">{email}</p>
      </div>
    </div>
  );
};

export default MemberRow;
