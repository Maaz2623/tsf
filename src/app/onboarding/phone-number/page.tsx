"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PhoneNumberPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const update = trpc.users.updateUserByClerkId.useMutation();

  const handleUpdate = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    try {
      await toast.promise(update.mutateAsync({ phoneNumber }), {
        loading: "Adding...",
        success: "Phone number added. Redirecting...",
        error: "Failed to add phone number",
      });
      router.replace(`/dashboard/events`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4 flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>User Onboarding</CardTitle>
          <CardDescription>Fill in your details</CardDescription>
        </CardHeader>
        <div className="flex justify-center items-center">
          <Separator className="w-3/4" />
        </div>
        <CardContent>
          <div>
            <Label className="mb-1">Phone Number</Label>
            <Input
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => {
                if (/^\d{0,10}$/.test(e.target.value)) {
                  setPhoneNumber(e.target.value);
                }
              }}
              placeholder="Enter 10-digit phone number"
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end items-center">
          <Button
            disabled={update.isPending || phoneNumber.length !== 10}
            onClick={handleUpdate}
          >
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhoneNumberPage;
