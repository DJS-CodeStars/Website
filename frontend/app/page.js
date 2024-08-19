import Image from "next/image";
import Analyzer from "@/components/Analyzer"
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";


const user = {
  rank: 'pupil',
  imageUrl: 'https://www.istockphoto.com/photo/colorful-panther-chameleon-gm1052202540-281251557?utm_campaign=category_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fimages%2Fanimals&utm_medium=affiliate&utm_source=unsplash&utm_term=Animals+Images+%26+Pictures%3A%3A%3A',
  name: 'atharva_n29',
  email: 'narvekaratharva29@gmail.com',
  joinedDate: '2024-01-01',
  college: 'DJSCE',
  city: 'Mumbai',
  country: 'India',
  contestRating: 1000,
  maxRating:1500,
};

const stats = {
  Tried: 120,
  Solved: 340,
  Average_Attempts: 230,
  Max_Attempts: 450,
  First_Attempt_Solved: 120,
  Max_Accepted: 340,
  Number_of_Contests: 230,
  Best_Rank: 450,
  Worst_Rank: 120,
  Max_Up: 340,
  Max_Down: 230,
  Best_Performance: 450,
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar></Navbar>
      <Hero></Hero>
      <Analyzer user={user} stats={stats}></Analyzer>
    </main>
  );
}
