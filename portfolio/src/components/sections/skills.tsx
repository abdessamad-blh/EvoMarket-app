import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/section";

export function Skills() {
  return (
    <Section id="skills" title="Skills" className="bg-muted">
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.name} className="rounded-xl border bg-card p-5">
            <dt className="text-sm font-semibold uppercase tracking-wide text-primary">{group.name}</dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2" aria-label={`${group.name} skills`}>
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Badge variant="outline" className="bg-background px-2.5 py-1 text-sm font-normal">
                      {skill}
                    </Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
