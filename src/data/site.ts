import office from "@/assets/project-office.jpg";
import bedroom from "@/assets/project-bedroom.jpg";
import commercial from "@/assets/project-commercial.jpg";
import dining from "@/assets/project-dining.jpg";
import hallway from "@/assets/project-hallway.jpg";
import reception from "@/assets/project-reception.jpg";

export const services = [
  {
    slug: "interior-finishing",
    name: "Interior Finishing",
    summary: "Refined surfaces, joinery and details executed to architectural standard.",
  },
  {
    slug: "office-fit-outs",
    name: "Office Fit-Outs",
    summary: "Workplace environments built for performance, brand and wellbeing.",
  },
  {
    slug: "gypsum-ceilings",
    name: "Gypsum Ceiling Design",
    summary: "Sculpted ceilings with integrated cove and recessed lighting.",
  },
  {
    slug: "curtains-sheers",
    name: "Curtains & Sheers",
    summary: "Custom drapery in linen, velvet and silk — tailored to every window.",
  },
  {
    slug: "office-blinds",
    name: "Office Blinds",
    summary: "Roller, roman and motorised blinds engineered for executive interiors.",
  },
  {
    slug: "wallpapers",
    name: "Wallpapers",
    summary: "Curated wallcoverings — from textured neutrals to statement murals.",
  },
  {
    slug: "renovations",
    name: "Renovations",
    summary: "Considered transformations of existing homes and commercial spaces.",
  },
  {
    slug: "space-planning",
    name: "Space Planning",
    summary: "Thoughtful layouts that balance flow, function and atmosphere.",
  },
  {
    slug: "lighting",
    name: "Ceiling & Lighting Enhancements",
    summary: "Layered lighting schemes that elevate every architectural detail.",
  },
];

export const projects = [
  { id: 1, title: "Marrakech Residence", category: "Residential", image: bedroom, location: "Private Villa" },
  { id: 2, title: "Atrium HQ Workspace", category: "Office", image: office, location: "Corporate Tower" },
  { id: 3, title: "Maison Noir Restaurant", category: "Commercial", image: commercial, location: "Hospitality" },
  { id: 4, title: "Carrara Dining Suite", category: "Residential", image: dining, location: "Penthouse" },
  { id: 5, title: "Travertine Entrance", category: "Residential", image: hallway, location: "Family Home" },
  { id: 6, title: "Walnut Reception", category: "Office", image: reception, location: "Headquarters" },
];

export const testimonials = [
  {
    quote: "Capital Construct delivered our home with the precision of a couture house. Every detail considered, every finish flawless.",
    author: "Layla H.",
    role: "Private Client, Residential",
  },
  {
    quote: "Our headquarters now reflects the calibre of our brand. The team understood ambition and translated it into space.",
    author: "Marcus D.",
    role: "Managing Director, Atrium Group",
  },
  {
    quote: "From the first sketch to the final reveal, the experience felt curated. Timeless, elegant and impeccably executed.",
    author: "Sara M.",
    role: "Founder, Maison Noir",
  },
];

export const processSteps = [
  { n: "01", title: "Consultation", text: "We listen, study the space, and align on vision, function and budget." },
  { n: "02", title: "Design", text: "Mood boards, layouts, materials and 3D visuals refined to perfection." },
  { n: "03", title: "Execution", text: "Skilled craftsmen and project managers deliver with discipline and care." },
  { n: "04", title: "Delivery", text: "A handover that feels like an unveiling — every detail considered." },
];