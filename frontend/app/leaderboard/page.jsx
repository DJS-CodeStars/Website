'use client'
import { Navbar } from "@/components/Navbar";
// import ProblemRecommender from "@/components/ProblemRecommender";
import Leaderboard from "@/components/Leaderboard";

import '@/app/globals.css'
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Navbar />
      {/* <ProblemRecommender /
      > */}
    <Leaderboard/>
    </div>
  );
}
