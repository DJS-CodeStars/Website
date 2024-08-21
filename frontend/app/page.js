import Image from "next/image";
import Analyzer from "@/components/Analyzer"
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Events } from "@/components/Events";
import { Footer } from "@/components/Footer";
import '@/app/globals.css'

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-between">
      <Navbar></Navbar>
      <Hero />
      <Events />
      <About />
      <Footer />
      <Analyzer/>
    </div>
  );
}
