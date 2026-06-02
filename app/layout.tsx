import type { Metadata } from "next";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrystaLogix | Bandgap Prediction Framework",
  description:
    "An interactive research showcase for a GPU-accelerated two-stage hurdle framework for bandgap prediction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="relative min-h-full overflow-x-hidden bg-[#071012] text-[#f7f3e8]">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-35 bg-[linear-gradient(rgba(125,226,214,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,226,214,0.08)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(circle_at_center,black_18%,transparent_78%)]"
        />
        <div className="relative z-10">
          <SiteNav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
