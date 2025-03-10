import { Exo_2 } from "next/font/google";

export const exo_2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const words = [
  { text: "Welcome", className: "text-white font-bold " },
  { text: "to", className: " text-white" },
  { text: "THE", className: "text-[#FFD700]" },
  { text: "STUDENT", className: "text-[#FFD700] font-bold " },
  { text: "FORUM.", className: "text-[#FFD700] font-bold " },
];

export const solarisEvents: EventType[] = [
  {
    title: "JAM",
    description: "Description",
    rating: 3,
    price: 1,
    teamSize: 1,
    date: new Date().toISOString().split("T")[0],
    maxRegistration: 10,
    festType: "solaris",
  },
];
export const events: EventType[] = [
  {
    title: "JAM",
    description:
      "A Japanese-themed twist on the classic Just A Minute game. Speak on a random Japanese culture topic for one minute without hesitation, repetition, or deviation.",
    rating: 3,
    price: 200,
    teamSize: 1,
    date: "24th Mar 2025",
    maxRegistration: 10,
    festType: "elysian",
  },
  {
    title: "ON SPOT PHOTOGRAPHY",
    description:
      "Capture the beauty of simplicity inspired by Wabi-Sabi. Submit original photographs based on a theme with only minor edits allowed.",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfexNaaAn8krBcnbuiTLKMtYmR3qCDIvgafNZy",
  },
  {
    title: "REEL MAKING",
    description:
      "Create a 60-second reel inspired by the Japanese philosophy of Mono no Aware, focusing on fleeting moments and emotions.",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "FACE PAINTING",
    description:
      "Bring Japanese-inspired art to life with face painting. Themes include cherry blossoms, dragons, or anime expressions.",
    rating: 3,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "PAINTING",
    description:
      "A team event where two members collaborate to create a unified painting based on a given theme.",
    rating: 3,
    price: 200,
    teamSize: 2,
    date: "24th Mar 2025",
    maxRegistration: 10,

    festType: "elysian",
  },
  {
    title: "HOGOTHON",
    description:
      "A speed-based eating challenge where teams of four race to finish Asian dishes as quickly as possible.",
    rating: 3,
    price: 300,
    teamSize: 4,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "LAW & ORDER",
    description:
      "A courtroom-style challenge where participants take on roles like prosecutor, defender, or witness to argue cases inspired by Japanese legal and moral dilemmas.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfLtFQq7NbGPnBUh2L0mZoReHOctDrMslYCKEQ",
  },
  {
    title: "MINI GAMES",
    description:
      "A series of fast-paced mini-games and puzzles that test speed, wit, and teamwork.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfB1EPkfyhLMs2clnPuDkUCjTvqyYNH9KxrgQf",
  },
  {
    title: "STAND UP",
    description:
      "A comedy showdown where participants perform original stand-up routines for 3+1 minutes, inspired by Japanese humor and quirks.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfYGTX5BtZFJIoEhgtPKxY16qHnscLjmaf2Bbi",
  },
  {
    title: "AIR CRASH",
    description:
      "A survival debate where participants argue why they deserve the last parachute in a high-stakes scenario.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "SHORT MOVIE MAKING",
    description:
      "Teams create a short film based on a theme, blending global creativity with Japanese-inspired charm.",
    rating: 4,
    price: 500,
    teamSize: 6,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "BGMI",
    description:
      "A BGMI tournament inspired by the stealth and strategy of shinobi, where teams battle for victory in a classic battle royale mode.",
    rating: 4,
    price: 300,
    teamSize: 4,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfFXhN58mr8PIGoQKgSOxtpZXU3bzaudLCnRM9",
  },
  {
    title: "SOLO DANCE",
    description:
      "A solo dance performance where participants showcase their style and creativity in 3+1 minutes, blending Indian and Western dance forms.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "SOLO SINGING",
    description:
      "A solo singing competition where participants perform a song of their choice for 3+1 minutes, with live instruments allowed.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
    maxRegistration: 10,
    date: "24th Mar 2025",
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfJuiwABTnRYMmSBlC7DVn0ZJcwbkKhjHaoOW3",
  },
  {
    title: "TREASURE HUNT",
    description:
      "A thrilling treasure hunt inspired by Japanese myths, where teams solve cryptic clues and puzzles to find hidden treasure.",
    rating: 4,
    price: 500,
    teamSize: 3,
    festType: "elysian",
    date: "24th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfsj4TASKAXn2CejWNtIm1zOsfcRUrEdoaGK50",
  },
  {
    title: "MURDER MYSTERY",
    description:
      "Teams solve a murder case using clues, testimonies, and evidence across three rounds of deduction and storytelling.",
    rating: 4,
    price: 500,
    teamSize: 2,
    festType: "elysian",
    date: "25th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "GROUP SINGING",
    description:
      "A group singing event where teams of 4-12 members perform a harmonious rendition of a song for 7+2 minutes.",
    rating: 5,
    price: 1200,
    teamSize: 12,
    festType: "elysian",
    date: "26th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfm79gxWlOTJ0QqsIWHc1gXzdC5NuyZnjf8eDF",
  },
  {
    title: "GROUP DANCE",
    description:
      "A group dance competition where teams of 4-12 members showcase synchronized performances for 4+2 minutes, blending Indian and Western styles.",
    rating: 5,
    price: 1200,
    teamSize: 12,
    festType: "elysian",
    date: "26th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "FASHION",
    description:
      "A fashion event where teams of 6-12 members showcase themed outfits on the ramp for 6+2 minutes, celebrating creativity and style.",
    rating: 5,
    price: 1500,
    teamSize: 12,
    festType: "elysian",
    date: "26th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfOAUfHCp9UVhJHNnpDOTydjC7Ywbi1WeqIA52",
  },
  {
    title: "MAD ADS",
    description:
      "Teams create and perform hilarious, over-the-top advertisements for 5+1 minutes, inspired by Japanese culture and humor.",
    rating: 5,
    price: 1200,
    teamSize: 7,
    festType: "elysian",
    date: "26th Mar 2025",
    maxRegistration: 10,
  },
  {
    title: "PERSONALITY HUNT",
    description:
      "A multi-round competition testing confidence, communication, creativity, and adaptability to crown the ultimate Mr. & Mrs. Elysian.",
    rating: 5,
    price: 700,
    teamSize: 1,
    festType: "elysian",
    date: "26th Mar 2025",
    maxRegistration: 10,
    imageUrl:
      "https://8i3zvqcf63.ufs.sh/f/ZE7bonILDjXfGFyEX455bQvLywKk8XNYrnV1RE9sMoAdDfUH",
  },
  // {
  //   title: "Entertainment Quiz",
  //   description:
  //     "A multi-round competition testing confidence, communication, creativity, and adaptability to crown the ultimate Mr. & Mrs. Elysian.",
  //   rating: 5,
  //   price: 500,
  //   teamSize: 1,
  //   festType: "elysian",
  //   date: "25th Mar 2025",
  // },
];

export const contingentPrice = 9000;

const testContingentPrice = 1;

export const contingentUpiLink = `upi://pay?pa=7349323005@pthdfc&pn=TheStudentForum&am=${testContingentPrice}&cu=INR`;
