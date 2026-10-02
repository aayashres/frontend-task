export interface Slide {
  id: number;
  src: string;
  alt: string;
}

export interface CourseStat {
  id: string;
  title: string;
  description: string;
  value: number;
}

export const SERVICES: readonly string[] = ["UI & UX Development", "Blockchain"];

export const SLIDES: readonly Slide[] = [
  { id: 1, src: "/images/slide-1.jpg", alt: "Hands organising tax documents next to a phone calculator" },
  { id: 2, src: "/images/slide-2.jpg", alt: "A laptop glowing in a dark room as its lid opens" },
  { id: 3, src: "/images/slide-3.jpg", alt: "Analytics dashboard open on a laptop beside a coffee" },
  { id: 4, src: "/images/slide-4.jpg", alt: "Laptop showing source code on a wooden desk" },
];

export const PARTNERS = ["cloud-education", "cmc", "snp", "zebec"] as const;
export type PartnerId = (typeof PARTNERS)[number];

export const ALL_COURSES = {
  value: 23,
  title: "All Courses",
  description: "courses you're powering through right now.",
};

export const COURSE_STATS: readonly CourseStat[] = [
  {
    id: "upcoming",
    title: "Upcoming Courses",
    description: "exciting new courses waiting to boost your skills.",
    value: 5,
  },
  {
    id: "ongoing",
    title: "Ongoing Courses",
    description: "currently happening—don't miss out on the action!",
    value: 10,
  },
];
