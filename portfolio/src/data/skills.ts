import type { SkillGroup } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Frontend",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "TanStack Query", "Zustand"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Fastify", "Express", "PostgreSQL", "Prisma", "Redis", "Socket.io", "REST APIs"],
  },
  {
    name: "Data",
    // TODO: complete (e.g. SQL, Python, PySpark, Delta Lake — only what you use).
    skills: ["Databricks", "TODO"],
  },
  {
    name: "AI & automation",
    // TODO: complete (LLM APIs, agent frameworks, other automation tools).
    skills: ["n8n", "TODO"],
  },
  {
    name: "DevOps",
    skills: ["Docker", "Linux (Ubuntu)", "Caddy", "Vercel", "Netlify", "Railway"],
  },
];
