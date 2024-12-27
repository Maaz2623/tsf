import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <Link href={`/events`}>Events</Link>
    </div>
  );
};

export default HomePage;
