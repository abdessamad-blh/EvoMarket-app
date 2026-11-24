import { profile, seo } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { getSiteUrl } from "@/lib/site-url";

/** schema.org Person structured data. TODO placeholders are left out automatically. */
export function PersonJsonLd() {
  const url = getSiteUrl();
  const isSet = (value: string) => !value.includes("TODO");

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url,
    image: `${url}${profile.photo}`,
    jobTitle: "Full-stack engineer",
    description: seo.description,
    address: { "@type": "PostalAddress", addressLocality: "Rabat", addressCountry: "MA" },
    ...(isSet(profile.email) ? { email: `mailto:${profile.email}` } : {}),
    sameAs: [profile.linkedin, profile.github].filter(isSet),
    knowsAbout: skillGroups.flatMap((g) => g.skills).filter(isSet),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
