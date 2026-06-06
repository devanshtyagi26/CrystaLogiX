import type { Metadata } from "next";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

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
    <html
      lang="en"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        suppressHydrationWarning
        className="relative min-h-full overflow-x-hidden bg-background text-foreground"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 opacity-45 bg-size-[72px_72px] dark:opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(rgb(var(--app-accent-cyan) / 0.11) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--app-accent-cyan) / 0.11) 1px, transparent 1px)",
              WebkitMaskImage:
                "radial-gradient(circle at center, rgb(var(--app-black)) 16%, transparent 76%)",
              maskImage:
                "radial-gradient(circle at center, rgb(var(--app-black)) 16%, transparent 76%)",
            }}
          />
          <div className="relative z-10">
            <SiteNav />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
