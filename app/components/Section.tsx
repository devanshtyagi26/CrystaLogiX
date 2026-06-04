import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`px-4 py-12 sm:px-8 sm:py-16 lg:px-10 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PageHeader({ eyebrow, title, body }: PageHeaderProps) {
  return (
    <Section className="border-b border-line/10 pt-10 sm:pt-14">
      <p className="text-[11px] uppercase tracking-[0.2em] text-teal sm:text-xs sm:tracking-[0.24em]">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight text-warm sm:mt-5 sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
        {body}
      </p>
    </Section>
  );
}

type MetricTileProps = {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
};

export function MetricTile({ value, label, detail }: MetricTileProps) {
  return (
    <div className="rounded-lg border border-line/10 bg-panel/[0.035] p-4 sm:p-5">
      <p className="text-xl font-semibold text-warm sm:text-2xl">{value}</p>
      <p className="mt-2 text-sm text-muted-subtle">{label}</p>
      {detail ? (
        <p className="mt-3 text-xs tracking-[0.16em] text-gold">{detail}</p>
      ) : null}
    </div>
  );
}

export function Panel({ children, className = "" }: SectionProps) {
  return (
    <div
      className={`rounded-lg border border-line/10 bg-panel/[0.035] ${className}`}
    >
      {children}
    </div>
  );
}
