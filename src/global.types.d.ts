interface EventType {
  title: string;
  description: string;
  rating: number;
  price: number;
  teamSize?: number;
  maxRegistration?: number;
  date?: string;
  festType: "elysian" | "solaris";
  imageUrl?: string;
}
