import { ModeToggle } from "@/components/ToggleMode";
import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Overview" },
  { href: "/framework", label: "Framework" },
  { href: "/results", label: "Results" },
  { href: "/simulator", label: "Simulator" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/10 bg-background/88 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-0">
        <Link
          href="/"
          className="min-w-0 text-sm font-semibold tracking-[0.22em] text-warm"
        >
          <Logo />
        </Link>
        <div className="flex max-w-full items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-md border border-line/10 bg-panel/[0.035] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-none">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded px-3 py-2 text-xs font-medium text-muted-soft transition hover:bg-line/8 hover:text-warm"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
