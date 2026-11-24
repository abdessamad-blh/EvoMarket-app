import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, title, description, className, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mb-8 sm:mb-10">
          <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description ? <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
