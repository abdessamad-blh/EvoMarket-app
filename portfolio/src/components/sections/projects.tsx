import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ExternalLink } from "@/components/external-link";
import { GitHubIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { AlsoBuilt } from "@/components/sections/also-built";

function ProjectCard({ project }: { project: Project }) {
  const { live, github } = project.links;
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] w-full border-b bg-muted object-cover"
      />
      <CardHeader className="gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.summary}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 text-sm">
        <div>
          <h4 className="font-medium">My role</h4>
          <p className="mt-1 text-muted-foreground">{project.role}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} tech stack`}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
        <p className="mt-auto border-l-2 border-primary pl-3 font-medium text-foreground">
          <span className="sr-only">Result: </span>
          {project.result}
        </p>
      </CardContent>
      {live || github ? (
        <CardFooter className="gap-4 border-t pt-4 text-sm font-medium">
          {live ? (
            <ExternalLink
              href={live}
              className="inline-flex items-center gap-1 text-primary hover:underline"
              aria-label={`Visit ${project.title} live site`}
            >
              Live site
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ExternalLink>
          ) : null}
          {github ? (
            <ExternalLink
              href={github}
              className="inline-flex items-center gap-1.5 text-foreground hover:text-primary"
              aria-label={`${project.title} source code on GitHub`}
            >
              <GitHubIcon className="size-4" />
              Code
            </ExternalLink>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}

export function Projects() {
  return (
    <Section id="projects" title="Featured projects" description="Selected work across web apps, AI and data.">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <AlsoBuilt />
    </Section>
  );
}
