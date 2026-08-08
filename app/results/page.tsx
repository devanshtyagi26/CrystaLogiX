"use client";
import BenchmarkLiftBars from "../components/BenchmarkLiftBars";
import { MetricTile, PageHeader, Panel, Section } from "../components/Section";
import {
  benchmarkHighlights,
  conformalResults,
  errorInsights,
  keyContributions,
  limitations,
  resultMetrics,
} from "../data/research";
import { useTheme } from "next-themes";

export default function ResultsPage() {
  const { theme } = useTheme();
  return (
    <main>
      <PageHeader
        eyebrow="Results"
        title="The end-to-end pipeline improves accuracy while exposing risk."
        body="The dissertation validates the framework on a withheld Materials Project test set, then separates the story into classifier behavior, nonmetal regression, calibrated intervals, and error regimes."
      />

      <Section className="border-b border-line/10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultMetrics.map((metric, index) => (
            <MetricTile key={index} {...metric} />
          ))}
        </div>
      </Section>

      <Section className="border-b border-line/10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-teal">
              Conformal prediction for Stage two regression
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-warm">
              Stage 2 predictions are accompanied by calibrated uncertainty
              intervals, enabling risk-aware materials screening.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {conformalResults.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-line/10 bg-background/60 p-5"
                >
                  <p className="text-sm text-muted-subtle">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-warm">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-gold">
                    {item.width}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 gap-4">
              {benchmarkHighlights.map((item) => (
                <p
                  key={item}
                  className="text-sm leading-7 text-muted-subtle before:mr-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-gold"
                >
                  {item}
                </p>
              ))}
            </div>
          </Panel>

          <div id="benchmark-lift-section">
            <Panel className="p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-gold">
                BENCHMARKING AGAINST STATE-OF-THE-ART BANDGAP PREDICTORS
              </p>
              <BenchmarkLiftBars />
            </Panel>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            GLOBAL PERFORMANCE VALIDATION
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-warm sm:text-4xl">
            End-to-End Validation Across 200,487 Materials.
          </h2>
        </div>
        <Panel className="p-6 flex gap-10 justify-around items-start">
          <div className="h-[85vh] w-[full] overflow-hidden rounded-md bg-background/60">
            <img
              src="/Parity Plots - Full Pipeline.png"
              alt="Piarity plot showing predicted vs. true bandgap values for the full pipeline, with a reference y=x line and error distribution shading."
              className="h-full w-full object-cover"
              style={
                theme === "dark"
                  ? {
                      filter:
                        "invert(1) sepia(6%) hue-rotate(95deg) saturate(0.7) brightness(0.92)",
                    }
                  : {}
              }
            />
          </div>
          <div className="w-[40%] text-lg mt-5">
            <h3 className="text-xl font-semibold text-warm mb-4">
              The Parity Analysis
            </h3>
            <p className="leading-7 text-muted-soft">
              This parity plot compares predicted and reference bandgap values
              across the complete holdout test set. Concentration around the
              ideal y = x line demonstrates that the hurdle-learning framework
              successfully models both metallic and semiconducting materials
              within a unified prediction pipeline.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-subtle">
              <li>
                <b className="font-semibold text-warm">
                  Zero-Inflation Management:
                </b>{" "}
                The dense concentration of points near the origin highlights the
                model's ability to handle the large metallic population (Eg = 0
                eV), a major challenge for conventional regression approaches.
              </li>
              <li>
                <b className="font-semibold text-warm">
                  Strong Agreement Across Common Materials:
                </b>{" "}
                Most samples cluster tightly around the ideal prediction line,
                contributing to the overall MAE of 0.2447 eV and R² of 0.8879
                across the complete dataset.
              </li>
              <li>
                <b className="font-semibold text-warm">Wide-Gap Challenges:</b>{" "}
                The largest residuals occur in sparsely represented high-bandgap
                insulators, where training examples become increasingly rare
                despite bias-correction procedures.{" "}
              </li>
            </ul>
          </div>
        </Panel>
      </Section>

      <Section className="border-b border-line/10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal">
              Error anatomy
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-warm">
              Remaining errors are concentrated in physically challenging
              regions of the bandgap spectrum.
            </h2>
          </div>
          <div className="grid gap-4">
            {errorInsights.map((item) => (
              <Panel key={item} className="p-5">
                <p className="text-sm leading-7 text-body">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>
      <Section className="border-b border-line/10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-teal">
              Key Contribution
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-warm">
              Why hurdle learning?
            </h2>
          </div>

          <div className="grid gap-4">
            {keyContributions.map((item) => (
              <Panel key={item} className="p-5">
                <p className="text-sm leading-7 text-body">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Limits
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-warm">
              Performance gains are substantial, but important scientific
              limitations remain.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {limitations.map((item) => (
              <Panel key={item} className="p-5">
                <p className="text-sm leading-7 text-muted">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
