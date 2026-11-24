import { navigation, profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="truncate text-sm font-semibold tracking-tight hover:text-primary">
          {profile.name}
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm">
            {navigation.map((item) => (
              <li key={item.href} className={item.href === "#contact" ? "" : "hidden sm:block"}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
