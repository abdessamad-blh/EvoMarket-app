import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
