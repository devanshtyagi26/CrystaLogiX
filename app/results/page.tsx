import { MetricTile, PageHeader, Panel, Section } from "../components/Section";
import {
  benchmarkLift,
  conformalResults,
  errorInsights,
  limitations,
  resultMetrics,
} from "../data/research";

export default function ResultsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Results"
        title="The end-to-end pipeline improves accuracy while exposing risk."
        body="The dissertation validates the framework on a withheld Materials Project test set, then separates the story into classifier behavior, nonmetal regression, calibrated intervals, and error regimes."
      />

      <Section className="border-b border-white/10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultMetrics.map((metric) => (
            <MetricTile key={metric.label} {...metric} />
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
              Conformal prediction
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#fffaf0]">
              Prediction intervals are calibrated in log space, then returned to eV.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {conformalResults.map((item) => (
                <div key={item.label} className="rounded-md border border-white/10 bg-[#071012]/60 p-5">
                  <p className="text-sm text-[#9fb7b2]">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-[#fffaf0]">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#fbbc4f]">
                    {item.width}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              Benchmark lift
            </p>
            <div className="mt-6 space-y-6">
              {benchmarkLift.map((item) => (
                <div key={item.model}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#dce7e4]">{item.model}</span>
                    <span className="font-semibold text-[#fffaf0]">{item.gain}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-[#fb5d52]"
                      style={{ width: item.gain }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
              Error anatomy
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#fffaf0]">
              The biggest remaining risk is not random; it is routed and energy-dependent.
            </h2>
          </div>
          <div className="grid gap-4">
            {errorInsights.map((item) => (
              <Panel key={item} className="p-5">
                <p className="text-sm leading-7 text-[#d5dfdc]">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              Limits
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#fffaf0]">
              The model is practical, but its validity boundary is explicit.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {limitations.map((item) => (
              <Panel key={item} className="p-5">
                <p className="text-sm leading-7 text-[#b9c7c3]">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
