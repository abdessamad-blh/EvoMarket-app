import { experience } from "@/data/experience";
import { Section } from "@/components/section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative ml-1.5 border-l border-border">
        {experience.map((item, index) => (
          <li key={`${item.organization}-${index}`} className="mb-10 ml-6 last:mb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[5px] mt-2 size-2.5 rounded-full bg-primary ring-4 ring-background"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="font-semibold">
                {item.role} <span className="font-normal text-muted-foreground">· {item.organization}</span>
              </h3>
              <p className="shrink-0 text-sm text-muted-foreground">
                {item.period}
                {item.location ? ` · ${item.location}` : ""}
              </p>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary/60">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
