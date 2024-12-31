import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/lib/uploadthing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  label: z.string().min(2),
  location: z.string().min(2),
  date: z.number().min(1),
  price: z.number().min(1),
  poster: z.optional(z.string()),
});

const EventForm = () => {
  const [image, setImage] = useState<string>(""); // Base64 or Object URL of the image
  const [file, setFile] = useState<File | null>(null); // File object for later upload

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      label: "",
      location: "",
      date: 0,
      price: 0,
      poster: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(selectedFile); // Read the file as a data URL
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (file) {
      console.log("File to upload:", file); // You can upload the file here
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Carousel className="min-h-60">
          <CarouselContent>
            <CarouselItem>
              <div className="flex items-center justify-center h-full  p-1 w-full">
                {image ? (
                  <div className="w-[400px] overflow-hidden shadow-lg aspect-video rounded-lg border border-black relative">
                    <Image src={image} alt="image" fill />
                  </div>
                ) : (
                  <div className="w-[400px] shadow-lg rounded-lg flex items-center justify-center border border-black/30 aspect-video relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-input"
                      onChange={handleImageChange}
                    />
                    <label
                      htmlFor="image-input"
                      className="cursor-pointer text-center flex flex-col items-center justify-center"
                    >
                      <span>Click to select an image</span>
                    </label>
                  </div>
                )}
              </div>
            </CarouselItem>
            <CarouselItem></CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <div className="h-10 relative w-full mt-4">
            <CarouselPrevious
              className="absolute left-5 rounded-md w-fit px-2 shadow-md"
              variant={`outline`}
            />
            <CarouselNext
              className={cn("absolute right-5 rounded-md w-fit px-2 shadow-md")}
              variant={`outline`}
            />
          </div>
        </Carousel>
      </form>
    </Form>
  );
};

export default EventForm;
