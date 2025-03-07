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
export const events: EventType[] = [
  {
    title: "JAM",
    description: "Description",
    rating: 3,
    price: 1,
    teamSize: 1,
    date: new Date().toISOString().split("T")[0],
    maxRegistration: 10,
  },
  {
    title: "ON SPOT PHOTOGRAPHY",
    description: "A fun-filled music festival",
    rating: 3,
    price: 450,
    teamSize: 1,
  },
  {
    title: "REEL MAKING",
    description: "Networking event for professionals",
    rating: 3,
    price: 320,
    teamSize: 1,
  },
  {
    title: "FACE PAINTING",
    description: "Outdoor adventure and hiking trip",
    rating: 3,
    price: 180,
    teamSize: 1,
  },
  {
    title: "PAINTING",
    description: "Food festival with various cuisines",
    rating: 3,
    price: 390,
    teamSize: 2,
  },
  {
    title: "HOGOTHON",
    description: "Art and craft workshop",
    rating: 3,
    price: 260,
    teamSize: 4,
  },
  {
    title: "LAW AND ORDER",
    description: "Business seminar on entrepreneurship",
    rating: 4,
    price: 310,
    teamSize: 1,
  },
  {
    title: "MINI GAMES",
    description: "Charity fundraiser for a good cause",
    rating: 4,
    price: 500,
    teamSize: 1,
  },
  {
    title: "STAND UP",
    description: "Comedy night with famous stand-up artists",
    rating: 4,
    price: 420,
    teamSize: 1,
  },
  {
    title: "AIR CRASH",
    description: "Technology expo showcasing new innovations",
    rating: 4,
    price: 290,
    teamSize: 1,
  },
  {
    title: "SHORT MOVIE MAKING",
    description: "Book reading and author interaction",
    rating: 4,
    price: 260,
    teamSize: 6,
  },
  {
    title: "BGMI",
    description: "Gaming tournament for esports enthusiasts",
    rating: 4,
    price: 480,
    teamSize: 4,
  },
  {
    title: "SOLO DANCE",
    description: "Photography workshop with experts",
    rating: 4,
    price: 340,
    teamSize: 1,
  },
  {
    title: "SOLO SINGING",
    description: "Cultural dance and music performance",
    rating: 4,
    price: 200,
    teamSize: 1,
  },
  {
    title: "TREASURE HUNT",
    description: "Science fair for students and researchers",
    rating: 4,
    price: 550,
    teamSize: 3,
  },
  {
    title: "MURDER MYSTERY",
    description: "Startup pitch event for investors",
    rating: 4,
    price: 400,
    teamSize: 2,
  },
  {
    title: "GROUP SINGING",
    description: "Coding bootcamp for developers",
    rating: 5,
    price: 450,
    teamSize: 12,
  },
  {
    title: "GROUP DANCE",
    description: "Yoga and wellness retreat",
    rating: 5,
    price: 220,
    teamSize: 3,
  },
  {
    title: "FASHION",
    description: "Astronomy night with telescope sessions",
    rating: 5,
    price: 380,
    teamSize: 12,
  },
  {
    title: "MAD ADS",
    description: "Fashion show featuring latest trends",
    rating: 4,
    price: 370,
    teamSize: 7,
  },
  {
    title: "PERSONALITY HUNT",
    description: "Live theater drama performance",
    rating: 5,
    price: 260,
    teamSize: 1,
  },
];

export const contingentPrice = 1;

export const contingentUpiLink = `upi://pay?pa=8296472301@axl&pn=MohammedMaaz&am=${contingentPrice}&cu=INR`;
