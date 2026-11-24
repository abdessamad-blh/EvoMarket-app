import type { Project } from "./types";

/**
 * Featured projects, shown in this order.
 * Images live in /public/projects (WebP, 1200×750). To add a new screenshot,
 * drop it in ./images-src and run `npm run images`.
 */
export const projects: Project[] = [
  {
    slug: "electrosky",
    title: "electrosky.ma",
    summary:
      "Full-stack e-commerce platform for an electronics store in Rabat, with click-and-collect, real-time order management and a multi-role admin.",
    role: "TODO: your role in 1–2 lines (e.g. what you designed, built and deployed).",
    stack: ["Next.js", "TypeScript", "Fastify", "PostgreSQL", "Prisma", "Redis", "Socket.io", "Docker"],
    result: "TODO: real result or metric (orders, performance, uptime…).",
    image: {
      src: "/projects/electrosky.webp",
      alt: "Electro Sky storefront homepage showing a TV promotion banner and product categories",
      width: 1200,
      height: 750,
    },
    links: { live: "https://electrosky.ma" },
  },
  {
    slug: "ai-shopping-assistant",
    title: "AI shopping assistant",
    summary: "TODO: one-line summary of the assistant and who it helps.",
    role: "TODO: your role in 1–2 lines.",
    stack: ["TODO"],
    result: "TODO: real result or metric.",
    image: {
      src: "/projects/ai-shopping-assistant.webp",
      alt: "Placeholder cover for the AI shopping assistant project",
      width: 1200,
      height: 750,
    },
    links: {
      // live: "TODO",
      // github: "TODO (only if public)",
    },
  },
  {
    slug: "olist-lakehouse",
    title: "Olist Lakehouse (Databricks)",
    summary: "TODO: one-line summary of the lakehouse (data sources, layers, what it answers).",
    role: "TODO: your role in 1–2 lines.",
    stack: ["Databricks", "TODO"],
    result: "TODO: real result or metric.",
    image: {
      src: "/projects/olist-lakehouse.webp",
      alt: "Placeholder cover for the Olist Lakehouse project on Databricks",
      width: 1200,
      height: 750,
    },
    links: {
      // github: "TODO (only if public)",
    },
  },
  {
    slug: "n8n-automation",
    title: "n8n automation pipeline",
    summary: "TODO: one-line summary of what the pipeline automates.",
    role: "TODO: your role in 1–2 lines.",
    stack: ["n8n", "TODO"],
    result: "TODO: real result or metric (e.g. hours saved per week, if measured).",
    image: {
      src: "/projects/n8n-automation.webp",
      alt: "Placeholder cover for the n8n automation pipeline project",
      width: 1200,
      height: 750,
    },
    links: {
      // github: "TODO (only if public)",
    },
  },
  {
    slug: "saidiabay",
    title: "saidiabay.ma",
    summary:
      "Full-stack real-estate platform for rentals and sales, with calendar bookings, seasonal pricing, a sales lead pipeline and a secure admin CMS.",
    role: "TODO: your role in 1–2 lines.",
    stack: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Prisma", "Leaflet", "Docker"],
    result: "TODO: real result or metric.",
    image: {
      src: "/projects/saidiabay.webp",
      alt: "Saidia Bay real-estate website shown on a laptop and a phone",
      width: 1200,
      height: 750,
    },
    links: { live: "https://saidiabay.ma" },
  },
  {
    slug: "evomarket",
    title: "evomarket.ma",
    summary:
      "Trilingual (French, English, Arabic with RTL) digital-agency website with an MDX blog and a multi-step quote request form.",
    role: "TODO: your role in 1–2 lines.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "next-intl", "MDX", "Resend"],
    result: "TODO: real result or metric.",
    image: {
      src: "/projects/evomarket.webp",
      alt: "EvoMarket logo on a dark blue background",
      width: 1200,
      height: 750,
    },
    links: {
      live: "https://evomarket.ma",
      // github: "TODO (only if the repository is public)",
    },
  },
];
