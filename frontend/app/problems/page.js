'use client'
import { Navbar } from "@/components/Navbar";
import ProblemRecommender from "@/components/ProblemRecommender";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      <ProblemRecommender />
    </div>
  );
}
