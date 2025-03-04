"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ratings = [
  { value: "All", label: "All Events" },
  { value: "2", label: "2 Star Events" },
  { value: "3", label: "3 Star Events" },
  { value: "4", label: "4 Star Events" },
  { value: "5", label: "5 Star Events" },
];

export function RatingsCombobox({
  selectedRating,
  setSelectedRating,
}: {
  selectedRating: string | null;
  setSelectedRating: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [open, setOpen] = React.useState(false);

  const displayValue = selectedRating ?? "All";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {ratings.find((r) => r.value === displayValue)?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No ratings found.</CommandEmpty>
            <CommandGroup>
              {ratings.map((rating) => (
                <CommandItem
                  key={rating.value}
                  value={rating.value}
                  onSelect={() => {
                    setSelectedRating(
                      rating.value === selectedRating ? null : rating.value
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedRating === rating.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {rating.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
