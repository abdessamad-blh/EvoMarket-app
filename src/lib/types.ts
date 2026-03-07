export interface Service {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  year: string;
  result?: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
  rating: number;
}

export interface ProcessStep {
  number: string;
  titleKey: string;
  descriptionKey: string;
  duration: string;
  deliverables: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  readingTime: string;
  locale: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  readingTime: string;
  locale: string;
}
