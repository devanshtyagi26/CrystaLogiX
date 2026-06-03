import BenchmarkLiftBars from "../components/BenchmarkLiftBars";
import { MetricTile, PageHeader, Panel, Section } from "../components/Section";
import {
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
          {resultMetrics.map((metric, index) => (
            <MetricTile key={index} {...metric} />
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Panel className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
              Conformal prediction for Stage two regression
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#fffaf0]">
              Stage 2 Prediction intervals are calibrated in log space, then
              returned to eV.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {conformalResults.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-white/10 bg-[#071012]/60 p-5"
                >
                  <p className="text-sm text-[#9fb7b2]">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-[#fffaf0]">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[#fbbc4f]">
                    {item.width}
                  </p>
                </div>
              ))}
            </div>
          </Panel>

          <div id="benchmark-lift-section">
            <Panel className="p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
                BENCHMARKING VS GRAPH NEURAL NETWORKS BASELINES
              </p>
              <BenchmarkLiftBars />
            </Panel>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
            GLOBAL PERFORMANCE VALIDATION
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0] sm:text-4xl">
            Evaluating Residual Distributions & Pipeline Accuracy.
          </h2>
        </div>
        <Panel className="p-6 flex gap-10 justify-around items-start">
          <div className="h-[85vh] w-[full] overflow-hidden rounded-md bg-[#071012]/60">
            <img
              src="/Parity Plots - Full Pipeline.png"
              alt="Piarity plot showing predicted vs. true bandgap values for the full pipeline, with a reference y=x line and error distribution shading."
              className="h-full w-full object-cover"
              style={{
                filter:
                  "invert(1) sepia(6%) hue-rotate(95deg) saturate(0.7) brightness(0.92)",
              }}
            />
          </div>
          <div className="w-[40%] text-lg mt-5">
            <h3 className="text-xl font-semibold text-[#fffaf0] mb-4">
              The Parity Analysis
            </h3>
            <p className="leading-7 text-[#aebfbb]">
              This parity plot maps the predicted electronic bandgaps against
              the true DFT-ground truth values across the entire withheld
              validation corpus.
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#9fb7b2]">
              <li>
                <b className="font-semibold text-[#fffaf0]">
                  Zero-Spike Handling:
                </b>{" "}
                Notice the high density of accurately mapped points anchoring
                the origin at <i>(0,0)</i>. This visually demonstrates the
                success of the Stage 1 XGBoost classifier gate in perfectly
                routing metallic phases out of the pipeline.
              </li>
              <li>
                <b className="font-semibold text-[#fffaf0]">
                  High-Density Convergence:
                </b>{" "}
                The majority of semiconductor entries tightly cluster within the
                shaded &plusmn;0.5eV calibration band along the perfect
                prediction line <i>y = x</i>.
              </li>
              <li>
                <b className="font-semibold text-[#fffaf0]">
                  Variance at Higher Gaps:
                </b>{" "}
                The minor dispersion seen above 6.0eV represents wide-bandgap
                insulators, an expected behavior given the extreme scarcity of
                high-energy insulator samples in open crystal structures.
              </li>
            </ul>
          </div>
        </Panel>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
              Error anatomy
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#fffaf0]">
              The biggest remaining risk is not random; it is routed and
              energy-dependent.
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
