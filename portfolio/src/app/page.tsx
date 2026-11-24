import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
