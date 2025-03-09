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
    title: "JAM - HIGUCHI TAIKAI",
    description:
      "A Japanese-themed twist on the classic Just A Minute game. Speak on a random Japanese culture topic for one minute without hesitation, repetition, or deviation.",
    rating: 3,
    price: 200,
    teamSize: 1,
    date: new Date().toISOString().split("T")[0],
    maxRegistration: 10,
    festType: "elysian",
  },
  {
    title: "ON SPOT PHOTOGRAPHY - GOLDEN SHUTTER",
    description:
      "Capture the beauty of simplicity inspired by Wabi-Sabi. Submit original photographs based on a theme with only minor edits allowed.",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "REEL MAKING - MONO NO REEL",
    description:
      "Create a 60-second reel inspired by the Japanese philosophy of Mono no Aware, focusing on fleeting moments and emotions.",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "FACE PAINTING - KAWAII SŌSAKU",
    description:
      "Bring Japanese-inspired art to life with face painting. Themes include cherry blossoms, dragons, or anime expressions.",
    rating: 3,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "PAINTING - FUJI’S COLORS",
    description:
      "A team event where two members collaborate to create a unified painting based on a given theme.",
    rating: 3,
    price: 200,
    teamSize: 2,
    festType: "elysian",
  },
  {
    title: "HOGOTHON - ICHI-GO ICHIE",
    description:
      "A speed-based eating challenge where teams of four race to finish Asian dishes as quickly as possible.",
    rating: 3,
    price: 300,
    teamSize: 4,
    festType: "elysian",
  },
  {
    title: "LAW & ORDER - SUE-MURAI",
    description:
      "A courtroom-style challenge where participants take on roles like prosecutor, defender, or witness to argue cases inspired by Japanese legal and moral dilemmas.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "MINI GAMES - TAKESHI’S CASTLE",
    description:
      "A series of fast-paced mini-games and puzzles that test speed, wit, and teamwork.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "STAND UP - WARAI NO KAMI",
    description:
      "A comedy showdown where participants perform original stand-up routines for 3+1 minutes, inspired by Japanese humor and quirks.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "AIR CRASH - CLASH OF TITANS",
    description:
      "A survival debate where participants argue why they deserve the last parachute in a high-stakes scenario.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "SHORT MOVIE MAKING - SHOTO SHINEMA",
    description:
      "Teams create a short film based on a theme, blending global creativity with Japanese-inspired charm.",
    rating: 4,
    price: 500,
    teamSize: 6,
    festType: "elysian",
  },
  {
    title: "BGMI - SHINOBI FORCE",
    description:
      "A BGMI tournament inspired by the stealth and strategy of shinobi, where teams battle for victory in a classic battle royale mode.",
    rating: 4,
    price: 300,
    teamSize: 4,
    festType: "elysian",
  },
  {
    title: "SOLO DANCE - YŪGEN",
    description:
      "A solo dance performance where participants showcase their style and creativity in 3+1 minutes, blending Indian and Western dance forms.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "SOLO SINGING - HITOKIRI",
    description:
      "A solo singing competition where participants perform a song of their choice for 3+1 minutes, with live instruments allowed.",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "TREASURE HUNT - ONE PIECE",
    description:
      "A thrilling treasure hunt inspired by Japanese myths, where teams solve cryptic clues and puzzles to find hidden treasure.",
    rating: 4,
    price: 500,
    teamSize: 3,
    festType: "elysian",
  },
  {
    title: "MURDER MYSTERY - DEATH NOTE",
    description:
      "Teams solve a murder case using clues, testimonies, and evidence across three rounds of deduction and storytelling.",
    rating: 4,
    price: 500,
    teamSize: 2,
    festType: "elysian",
  },
  {
    title: "GROUP SINGING - UTAGOE SANKA",
    description:
      "A group singing event where teams of 4-12 members perform a harmonious rendition of a song for 7+2 minutes.",
    rating: 5,
    price: 1200,
    teamSize: 12,
    festType: "elysian",
  },
  {
    title: "GROUP DANCE - ZANSHIN",
    description:
      "A group dance competition where teams of 4-12 members showcase synchronized performances for 4+2 minutes, blending Indian and Western styles.",
    rating: 5,
    price: 1200,
    teamSize: 12,
    festType: "elysian",
  },
  {
    title: "FASHION - RUNWAY OF REIWA",
    description:
      "A fashion event where teams of 6-12 members showcase themed outfits on the ramp for 6+2 minutes, celebrating creativity and style.",
    rating: 5,
    price: 1500,
    teamSize: 12,
    festType: "elysian",
  },
  {
    title: "MAD ADS - ADD-ZILLA",
    description:
      "Teams create and perform hilarious, over-the-top advertisements for 5+1 minutes, inspired by Japanese culture and humor.",
    rating: 5,
    price: 1000,
    teamSize: 7,
    festType: "elysian",
  },
  {
    title: "PERSONALITY HUNT - TOKYO MAFIA",
    description:
      "A multi-round competition testing confidence, communication, creativity, and adaptability to crown the ultimate Mr. & Mrs. Elysian.",
    rating: 5,
    price: 500,
    teamSize: 1,
    festType: "elysian",
  },
];

export const contingentPrice = 9000;

const testContingentPrice = 1;

export const contingentUpiLink = `upi://pay?pa=7349323005@pthdfc&pn=TheStudentForum&am=${testContingentPrice}&cu=INR`;
