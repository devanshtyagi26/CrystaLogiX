import { MobileNav } from "./mobile-nav";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Overview" },
  { href: "/framework", label: "Framework" },
  { href: "/results", label: "Results" },
  { href: "/simulator", label: "Simulator" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo — static, safe for SSR */}
        <a href="/" className="flex items-center gap-2 font-semibold">
          <Logo />
        </a>

        <DesktopNav links={links} />
        <MobileNav links={links} />
      </div>
    </header>
  );
}
