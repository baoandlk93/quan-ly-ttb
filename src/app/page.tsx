"use client";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/pages/Home";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
