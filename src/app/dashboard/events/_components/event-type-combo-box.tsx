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

const frameworks = [
  {
    value: "elysian",
    label: "Elysian",
  },
  {
    value: "solaris",
    label: "Solaris",
  },
] as const;

export function EventTypeComboBox({
  eventType,
  setEventType,
}: {
  eventType: "elysian" | "solaris";
  setEventType: React.Dispatch<React.SetStateAction<"elysian" | "solaris">>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="text-2xl w-[200px] font-semibold justify-between"
        >
          {frameworks.find((framework) => framework.value === eventType)
            ?.label || "Select Event Type"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    if (
                      currentValue === "elysian" ||
                      currentValue === "solaris"
                    ) {
                      setEventType(currentValue); // Updates parent state
                      setOpen(false);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      eventType === framework.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
