import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import React from "react";

const HomePage = () => {
  return (
    <div
      
      className="min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden"
    >
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default HomePage;
