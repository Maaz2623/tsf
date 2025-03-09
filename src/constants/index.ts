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
    title: "TEST EVENT",
    description: "Test description",
    rating: 3,
    price: 1,
    teamSize: 2,
    date: new Date().toISOString().split("T")[0],
    maxRegistration: 4,
    festType: "elysian",
  },
  {
    title: "JAM",
    description: "Description",
    rating: 3,
    price: 200,
    teamSize: 1,
    date: new Date().toISOString().split("T")[0],
    maxRegistration: 10,
    festType: "elysian",
  },
  {
    title: "ON SPOT PHOTOGRAPHY",
    description: "A fun-filled music festival",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "REEL MAKING",
    description: "Networking event for professionals",
    rating: 3,
    price: 200,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "PAINTING",
    description: "Food festival with various cuisines",
    rating: 3,
    price: 200,
    teamSize: 2,
    festType: "elysian",
  },
  {
    title: "HOGOTHON",
    description: "Art and craft workshop",
    rating: 3,
    price: 300,
    teamSize: 4,
    festType: "elysian",
  },
  {
    title: "FACE PAINTING",
    description: "Outdoor adventure and hiking trip",
    rating: 3,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "BGMI",
    description: "Gaming tournament for esports enthusiasts",
    rating: 3,
    price: 300,
    teamSize: 4,
    festType: "elysian",
  },
  {
    title: "LAW AND ORDER",
    description: "Business seminar on entrepreneurship",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "MINI GAMES",
    description: "Charity fundraiser for a good cause",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "STAND UP",
    description: "Comedy night with famous stand-up artists",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "AIR CRASH",
    description: "Technology expo showcasing new innovations",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "SHORT MOVIE MAKING",
    description: "Book reading and author interaction",
    rating: 4,
    price: 500,
    teamSize: 6,
    festType: "elysian",
  },
  {
    title: "SOLO DANCE",
    description: "Photography workshop with experts",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "SOLO SINGING",
    description: "Cultural dance and music performance",
    rating: 4,
    price: 300,
    teamSize: 1,
    festType: "elysian",
  },
  {
    title: "TREASURE HUNT",
    description: "Science fair for students and researchers",
    rating: 4,
    price: 500,
    teamSize: 3,
    festType: "elysian",
  },
  {
    title: "MURDER MYSTERY",
    description: "Startup pitch event for investors",
    rating: 4,
    price: 500,
    teamSize: 2,
    festType: "elysian",
  },
  {
    title: "GROUP SINGING",
    description: "Coding bootcamp for developers",
    rating: 5,
    price: 1200,
    teamSize: 12,
    festType: "elysian",
  },
  {
    title: "GROUP DANCE",
    description: "Yoga and wellness retreat",
    rating: 5,
    price: 1200,
    teamSize: 3,
    festType: "elysian",
  },
  {
    title: "FASHION",
    description: "Astronomy night with telescope sessions",
    rating: 5,
    price: 1500,
    teamSize: 12,
    festType: "elysian",
  },
  {
    title: "MAD ADS",
    description: "Fashion show featuring latest trends",
    rating: 5,
    price: 1000,
    teamSize: 7,
    festType: "elysian",
  },
  {
    title: "PERSONALITY HUNT",
    description: "Live theater drama performance",
    rating: 5,
    price: 500,
    teamSize: 1,
    festType: "elysian",
  },
];

export const contingentPrice = 9000;

const testContingentPrice = 1;

export const contingentUpiLink = `upi://pay?pa=7349323005@pthdfc&pn=TheStudentForum&am=${testContingentPrice}&cu=INR`;
