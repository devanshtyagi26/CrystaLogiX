import Link from "next/link";

const links = [
  { href: "/", label: "Overview" },
  { href: "/framework", label: "Framework" },
  { href: "/results", label: "Results" },
  { href: "/simulator", label: "Simulator" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071012]/88 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm font-semibold tracking-[0.22em] text-[#fffaf0]">
          CrystaLogiX
        </Link>
        <div className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.035] p-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-xs font-medium text-[#a8c8c4] transition hover:bg-white/8 hover:text-[#fffaf0]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
