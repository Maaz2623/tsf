"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { contingentPrice, contingentUpiLink, events } from "@/constants";
import QRCode from "react-qr-code";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Loader2Icon, PackageIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import { useContingentFull } from "@/hooks/use-contingent-full";

const ContingentModal = () => {
  const [contingentGenerator, setContingentGenerator] = useState(false);

  const [contingentModalOpen, setContingentModalOpen] = useState(false);

  const { data: hasContingent, isFetching } =
    trpc.contingents.hasContingent.useQuery();

  const { data: hasTickets, isFetching: fetchingTickets } =
    trpc.tickets.getByClerkId.useQuery();

  const [full] = useContingentFull();

  return (
    <>
      <ContingentGenerator
        contingentModalOpen={contingentModalOpen}
        setContingentModalOpen={setContingentModalOpen}
        contingentGeneratorOpen={contingentGenerator}
        setContingentGeneratorOpen={setContingentGenerator}
      />
      <AlertDialog
        onOpenChange={setContingentModalOpen}
        open={contingentModalOpen}
      >
        <button
          disabled={isFetching || fetchingTickets}
          onClick={() => {
            if (full) {
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } flex items-center gap-3 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md`}
                >
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <p className="font-medium">
                    Some events are full. Please select events and buy tickets
                    instead of a contingent.
                  </p>
                </div>
              ));
              return;
            }
            if (hasContingent) {
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } flex items-center gap-3 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md`}
                >
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <p className="font-medium">
                    You already have a package booked.
                  </p>
                </div>
              ));
              return;
            }
            if (hasTickets && hasTickets.length !== 0) {
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } flex items-center gap-3 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg shadow-md`}
                >
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <p className="font-medium">
                    You have already booked one or more one-time tickets. You
                    cannot have both contingent plan and one-time tickets.
                    Generate one-time tickets again and add your events
                  </p>
                </div>
              ));
              return;
            }

            setContingentModalOpen(!contingentModalOpen);
          }}
          className="inline-flex h-8 text-sm animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 "
        >
          {isFetching ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <>
              <PackageIcon className="size-5 mr-2" />
              Contingent
            </>
          )}
        </button>
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
                Scan or Click QR to Pay{" "}
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
            <Button
              onClick={() => setContingentGenerator(true)}
              disabled={full}
            >
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
  contingentGeneratorOpen,
  contingentModalOpen,
  setContingentModalOpen,
  setContingentGeneratorOpen,
}: {
  contingentGeneratorOpen: boolean;
  contingentModalOpen: boolean;
  setContingentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setContingentGeneratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const [selectedEvents] = useState<EventType[]>(events);

  const [newImageUrl, setNewImageUrl] = useState("");

  const [collegeName, setCollegeName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [festType, setFestType] = useState<"elysian" | "solaris" | undefined>(
    "elysian"
  );

  const [name, setName] = useState("");

  const utils = trpc.useUtils();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      toast.dismiss();
      toast.success("Upload complete");
      setNewImageUrl(res[0].ufsUrl);
    },
    onUploadError: () => {
      toast.dismiss();
      toast.error("Upload error");
    },
    onUploadBegin: () => {
      toast.loading("Uploading file. Please wait...");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      startUpload([file]);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const createTicket = trpc.contingents.createContingent.useMutation();

  const router = useRouter();

  const handleCreateTicket = async () => {
    if (!phoneNumber) return;
    const mutationPromise = createTicket.mutateAsync(
      {
        paymentScreenshotUrl: newImageUrl,
        events: selectedEvents,
        collegeName: collegeName,
        festType: festType as "elysian" | "solaris",
        phoneNumber: phoneNumber,
        name: name,
      },
      {
        onSuccess: () => {
          setContingentGeneratorOpen(false);
          setCollegeName("");
          setImage(null);
          setContingentModalOpen(!contingentModalOpen);
          router.push(`/dashboard/contingents`);
          utils.contingents.getByClerkId.invalidate();
          utils.contingents.invalidate();
          utils.contingents.getAllContingents.invalidate();
        },
      }
    );

    toast.promise(mutationPromise, {
      loading: "Generating contingent plan for you",
      success: "Contingent plan generated",
      error: "Contingent plan generation failed",
    });
  };

  return (
    <Drawer open={contingentGeneratorOpen}>
      <DrawerContent className="z-50">
        <DrawerHeader>
          <DrawerTitle className="w-full text-center text-2xl">
            Generate Contingent Plan
          </DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="min-h-40 space-y-4 w-full flex flex-col justify-center items-center">
          <div className="space-y-1 w-[300px]">
            <Label>Fullname</Label>
            <Input
              disabled={createTicket.isPending}
              placeholder="e.g. Rohit Malhotra"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1 w-[300px]">
            <Label>University Name</Label>
            <Input
              disabled={createTicket.isPending}
              placeholder="e.g. Jain College VV Puram"
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>
          <div className="space-y-1 w-[300px]">
            <Label>Phone Number</Label>
            <Input
              disabled={createTicket.isPending}
              placeholder="e.g. 829647***1"
              maxLength={10}
              minLength={10}
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="space-y-1 w-[300px]">
            <Label>Upload payment screenshot (MAX 4MB)</Label>
            <Input
              disabled={createTicket.isPending}
              placeholder="Select image"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          {/* <div className="flex flex-col w-[300px] items-center justify-center space-y-4 p-6  border-dotted border-2 rounded-lg">
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
                  Upload payment screenshot. (MAX 4MB)
                </p>
                <input
                  disabled={createTicket.isPending}
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*" // Allows only image files
                />
                <Button
                  disabled={createTicket.isPending}
                  className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  onClick={handleUploadClick}
                >
                  <UploadIcon className="w-5 h-5" />
                  Upload
                </Button>
              </>
            )}
          </div> */}
          <div className="flex gap-y-2 w-[300px] flex-col justify-center items-center">
            <Button
              className="w-[300px]"
              onClick={handleCreateTicket}
              disabled={
                selectedEvents.length === 0 ||
                !image ||
                isUploading ||
                createTicket.isPending ||
                collegeName.length === 0 ||
                name.length === 0 ||
                phoneNumber.length === 0
              }
            >
              {isUploading && (
                <>
                  <Loader2Icon className="mr-1 animate-spin" />
                  Uploading
                </>
              )}
              {!isUploading && !createTicket.isPending && "Verify"}
              {createTicket.isPending && "Generating..."}
            </Button>
            <Button
              variant={`outline`}
              className="w-full"
              onClick={() => setContingentGeneratorOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div className="h-[20px]" />
      </DrawerContent>
    </Drawer>
  );
};
