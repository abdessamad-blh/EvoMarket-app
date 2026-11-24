import { Mail } from "lucide-react";

import { profile } from "@/data/profile";
import { ExternalLink } from "@/components/external-link";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Section } from "@/components/section";

export function Contact() {
  const linkClass =
    "group flex items-center gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent";
  const iconClass = "size-5 shrink-0 text-primary";
  const githubHandle = profile.github.replace(/^https?:\/\/(www\.)?github\.com\//, "@");

  return (
    <Section
      id="contact"
      title="Contact"
      description="Open to full-time roles and freelance projects, remote or on-site. The fastest way to reach me is email."
      className="bg-muted"
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        <li>
          <a href={`mailto:${profile.email}`} className={linkClass}>
            <Mail className={iconClass} aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-medium">Email</span>
              <span className="block truncate text-sm text-muted-foreground">{profile.email}</span>
            </span>
          </a>
        </li>
        <li>
          <ExternalLink href={profile.linkedin} className={linkClass}>
            <LinkedInIcon className={iconClass} />
            <span className="min-w-0">
              <span className="block font-medium">LinkedIn</span>
              <span className="block truncate text-sm text-muted-foreground">{profile.name}</span>
            </span>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.github} className={linkClass}>
            <GitHubIcon className={iconClass} />
            <span className="min-w-0">
              <span className="block font-medium">GitHub</span>
              <span className="block truncate text-sm text-muted-foreground">{githubHandle}</span>
            </span>
          </ExternalLink>
        </li>
      </ul>
    </Section>
  );
}
