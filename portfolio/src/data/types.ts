// Shared content types. Edit content in the sibling files, not here.

export type Profile = {
  name: string;
  /** Short role line shown under the name. */
  title: string;
  location: string;
  /** 1–2 sentence intro under the title. */
  intro: string;
  /** Path in /public. Recommended: square, ~600×600, < 100 KB. */
  photo: string;
  photoAlt: string;
  email: string;
  linkedin: string;
  github: string;
  cvEn: string;
  cvFr: string;
};

export type Seo = {
  /** Browser tab / search result title. */
  title: string;
  description: string;
  keywords: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  /** Unique, URL-safe id. */
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  /** Outcome or metric. Only real, verifiable numbers. */
  result: string;
  image: ProjectImage;
  links: {
    live?: string;
    /** Only set when the repository is public. */
    github?: string;
  };
};

export type AlsoBuiltItem = {
  title: string;
  description: string;
  href?: string;
  badge?: string;
};

export type SkillGroup = {
  name: string;
  skills: string[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  /** Free text, e.g. "2024 — present". */
  period: string;
  location?: string;
  /** 1–3 short bullet points. */
  highlights: string[];
};
