"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./Logo";

function FooterYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="Open menu"
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Menu className="h-5 w-5" />
        </SheetTrigger>

        <SheetContent side="right" className="flex flex-col p-0 w-72">
          {/* Header */}
          <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
            <SheetTitle className="flex items-center gap-2 font-semibold text-base">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <Logo />
              </a>
            </SheetTitle>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-md hover:bg-accent transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetHeader>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-2 mb-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </p>
            <ul className="space-y-1">
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent",
                      )}
                    >
                      {label}
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t px-4 py-3 text-xs text-muted-foreground">
            © <FooterYear /> CrystalLogix. All rights reserved.
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
