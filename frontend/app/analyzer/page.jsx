'use client'
import { Navbar } from "@/components/Navbar";
import Analyzer from "@/components/Analyzer";
import '@/app/globals.css'
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      <Analyzer />
    </div>
  );
}
