import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Button variant="outline" asChild>
        <Link href={`/dashboard/events`}>Dashboard</Link>
      </Button>
    </div>
  );
};

export default HomePage;
