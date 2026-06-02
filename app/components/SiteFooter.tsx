import Link from "next/link";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/framework", label: "Framework" },
  { href: "/results", label: "Results" },
  { href: "/simulator", label: "Simulator" },
];

const connections = [
  { label: "GitHub", href: "https://www.github.com/devanshtyagi26" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tyagi-devansh" },
  { label: "Email", href: "mailto:tyagidevansh3@gmail.com" },
  { label: "Portfolio", href: "https://abc.com" },
  { label: "Research Profile", href: "https://aa.rr" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#081317]/96">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.9fr] lg:px-10">
        <div className="max-w-md">
          <p className="text-sm font-semibold tracking-[0.24em] text-[#fffaf0]">
            CrystaLogiX
          </p>
          <p className="mt-4 text-sm leading-7 text-[#b9c7c3]">
            A focused research interface for materials discovery, bandgap screening,
            and uncertainty-aware decisions.
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#7de2d6]">
            Crafted by Devansh Tyagi
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#fbbc4f]">
            Quick Navigation
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm text-[#d5dfdc] transition hover:text-[#7de2d6]"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#fbbc4f]">
            Connect
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {connections.map((connection) => (
              <a
                key={connection.label}
                href={connection.href}
                target={connection.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={connection.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="text-sm text-[#d5dfdc] transition hover:text-[#7de2d6]"
              >
                {connection.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 text-xs text-[#8fa5a0] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CrystaLogiX. All rights reserved.</p>
          <p>Designed for materials science screening, interpretation, and research workflows.</p>
        </div>
      </div>
    </footer>
  );
}