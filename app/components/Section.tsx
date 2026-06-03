import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`px-5 py-16 sm:px-8 lg:px-10 ${className}`}>
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
    <Section className="border-b border-line/10 pt-14">
      <p className="text-xs uppercase tracking-[0.24em] text-teal">{eyebrow}</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-warm sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted sm:text-lg">
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
    <div className="rounded-lg border border-line/10 bg-panel/[0.035] p-5">
      <p className="text-2xl font-semibold text-warm">{value}</p>
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
