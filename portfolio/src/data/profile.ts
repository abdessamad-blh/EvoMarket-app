import type { Profile, Seo } from "./types";

export const profile: Profile = {
  name: "Abdessamad Belahcen",
  title: "Full-stack engineer — web apps, AI agents & data pipelines",
  location: "Rabat, Morocco · open to remote & on-site",
  intro:
    "TODO: one or two sentences about what you build and the kind of team or problems you want to work on next.",
  // TODO: replace /public/photo.jpg with your real photo (square, ~600×600).
  photo: "/photo.jpg",
  photoAlt: "Portrait of Abdessamad Belahcen",
  // TODO: your public contact email.
  email: "TODO@example.com",
  // TODO: your LinkedIn profile URL.
  linkedin: "https://www.linkedin.com/in/TODO",
  github: "https://github.com/abdessamad-blh",
  // TODO: add /public/cv-en.pdf and /public/cv-fr.pdf.
  cvEn: "/cv-en.pdf",
  cvFr: "/cv-fr.pdf",
};

export const seo: Seo = {
  title: `${profile.name} — Full-stack engineer`,
  description:
    "Abdessamad Belahcen is a full-stack engineer in Rabat, Morocco, building web apps, AI agents and data pipelines. Open to remote and on-site roles.",
  keywords: [
    "Abdessamad Belahcen",
    "full-stack engineer",
    "software engineer Morocco",
    "Next.js developer",
    "data engineer",
    "automation engineer",
    "AI agents",
    "n8n",
    "Databricks",
    "Rabat",
  ],
};

/** In-page navigation (section ids must match the components). */
export const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
