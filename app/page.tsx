import Link from "next/link";
import { MetricTile, Panel, Section } from "./components/Section";
import {
  applications,
  datasetFacts,
  headlineMetrics,
  pipelineStages,
} from "./data/research";
import MotionAnimation from "./components/MotionAnimation";

const routes = [
  {
    href: "/framework",
    title: "Trace the hurdle architecture",
    body: "Follow the data path from Materials Project records to GPU featurization, phase routing, regression, bias correction, and conformal calibration.",
  },
  {
    href: "/results",
    title: "Audit the model behavior",
    body: "Inspect stage metrics, conformal interval coverage, benchmark improvements, error regimes, and known validity threats.",
  },
  {
    href: "/simulator",
    title: "Screen candidate materials",
    body: "Adjust the classifier threshold, confidence level, and acquisition preference to see how routing and uncertainty change decisions.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-white/10">
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-5 py-4 sm:px-8 lg:grid-cols-[0.93fr_1.07fr] lg:px-10">
          <div>
            <p className="inline-flex rounded-full border border-[#7de2d6]/30 bg-[#7de2d6]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#7de2d6]">
              GPU-accelerated materials informatics
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-[#fffaf0] sm:text-7xl">
              Predicting the Electronic Future of Materials, Instantly
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#b9c7c3] sm:text-lg">
              CrystaLogix demonstrates a two-stage hurdle framework for electronic
              bandgap prediction: classify metallic phases first, then estimate the
              nonmetallic bandgap with an ensemble regressor and conformal uncertainty.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/simulator"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#fbbc4f] px-5 text-sm font-semibold text-[#071012] transition hover:bg-[#ffd37a]"
              >
                Open simulator
              </Link>
              <Link
                href="/framework"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/16 px-5 text-sm font-semibold text-[#f7f3e8] transition hover:border-[#7de2d6]/50 hover:bg-white/5"
              >
                Study framework
              </Link>
            </div>
          </div>

          <Panel className="relative min-h-115 overflow-hidden shadow-2xl shadow-black/40 lg:min-h-157.5">
            <div className="absolute inset-0 z-0">
              <MotionAnimation />
            </div>
            <div className="absolute inset-x-4 bottom-4 z-10 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-[#7de2d6]/20 bg-[#071012]/80 p-4 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7de2d6]">Stage One</p>
                <p className="mt-2 text-lg font-semibold">Metal Classification Gate</p>
                <p className="mt-1 text-sm text-[#b9c7c3]">XGBoost Classifier | Recall: 0.28</p>
              </div>
              <div className="rounded-md border border-[#fbbc4f]/25 bg-[#071012]/80 p-4 backdrop-blur-lg">
                <p className="text-xs uppercase tracking-[0.2em] text-[#fbbc4f]">Stage Two</p>
                <p className="mt-2 text-lg font-semibold">Ensemble Regressor</p>
                <p className="mt-1 text-sm text-[#b9c7c3]">Conformal Prediction Intervals</p>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <Section className="border-b border-white/10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {headlineMetrics.map((metric, index) => (
            <MetricTile key={`${metric.value}-${index}`} {...metric} />
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              Dissertation core
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-4xl">
              A model built around the physical split between metals and nonmetals.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#b9c7c3]">
              The Materials Project bandgap target is not a normal regression target:
              more than half of the corpus sits exactly at E<sub>g</sub> = 0eV. The hurdle
              framework treats that spike as a classification problem before modeling
              the continuous positive-gap distribution.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {datasetFacts.map((fact) => (
              <MetricTile
                key={fact.label}
                value={fact.value}
                label={fact.label}
                detail={fact.detail}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-b border-white/10">

        <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              TECHNICAL IMPLEMENTATION
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-4xl">
              Engineering a High-Throughput Pipeline.
            </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pipelineStages.map((stage) => (
            <Panel key={stage.step} className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#7de2d6]">{stage.step}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-[#fbbc4f]">
                  {stage.eyebrow}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-[#fffaf0]">{stage.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#aebfbb]">{stage.body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/10">
      <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              INTERACTIVE CORE
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-4xl">
              Inspect the Framework Dynamics.
            </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="group">
              <Panel className="h-full p-6 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:border-[#7de2d6]/45 group-hover:bg-white/5.5 group-hover:shadow-[0_18px_40px_rgba(7,16,18,0.32)]">
                <h3 className="text-xl font-semibold text-[#fffaf0] transition-colors duration-300 group-hover:text-[#f7f3e8]">
                  {route.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#aebfbb] transition-colors duration-300 group-hover:text-[#d8e6e2]">
                  {route.body}
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#7de2d6] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#fbbc4f]">
                  Explore
                </p>
              </Panel>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              DOWNSTREAM IMPACT
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-4xl">
              Real-world R&D Deployment Scenarios.
            </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {applications.map((item) => (
            <Panel key={item.title} className="p-6">
              <h3 className="text-lg font-semibold text-[#fffaf0]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#aebfbb]">{item.body}</p>
            </Panel>
          ))}
        </div>
      </Section>
    </main>
  );
}
