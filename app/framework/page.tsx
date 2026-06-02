import { MetricTile, PageHeader, Panel, Section } from "../components/Section";
import { datasetFacts, featurePipeline, pipelineStages } from "../data/research";

export default function FrameworkPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Framework"
        title="From raw DFT records to a calibrated two-stage predictor."
        body="The dissertation decomposes bandgap prediction into the parts the data actually asks for: a phase decision for the zero-inflated spike, then a positive-gap regressor for nonmetallic materials."
      />

      <Section className="border-b border-white/10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {datasetFacts.map((fact) => (
            <MetricTile
              key={fact.label}
              value={fact.value}
              label={fact.label}
              detail={fact.detail}
            />
          ))}
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              Feature path
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#fffaf0]">
              The feature matrix is small enough to train fast, but still grounded in chemistry.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#b9c7c3]">
              The notebook begins with Materials Project entries and uses compositional
              statistics as a portable representation of atomic, compositional, and
              structural information. The final 87-feature matrix is designed for
              fast training, repeatable scaling, and leakage-safe validation.
            </p>
          </div>
          <Panel className="p-6">
            <div className="space-y-5">
              {featurePipeline.map((item, index) => (
                <div key={item} className="grid gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0 sm:grid-cols-[56px_1fr]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#7de2d6]/12 text-sm font-semibold text-[#7de2d6]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-[#d5dfdc]">{item}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section className="border-b border-white/10">
        <div className="grid gap-4 md:grid-cols-2">
          {pipelineStages.map((stage) => (
            <Panel key={stage.step} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-[#7de2d6]">{stage.step}</span>
                <span className="rounded bg-[#fbbc4f]/12 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#fbbc4f]">
                  {stage.eyebrow}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[#fffaf0]">{stage.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#aebfbb]">{stage.body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Panel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#7de2d6]">
              Stage 1 target
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[#fffaf0]">
              y = 0 for metals, y = 1 for nonmetals
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#b9c7c3]">
              The classifier assigns Eg = 0 eV directly when a material is routed as
              metallic. This prevents the continuous regressor from being trained
              against the dense zero spike and reduces regression-toward-zero behavior.
            </p>
          </Panel>
          <Panel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[#fbbc4f]">
              Stage 2 target
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-[#fffaf0]">
              log(1 + Eg) for positive bandgaps
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#b9c7c3]">
              The positive-gap regressor works on a transformed target to stabilize
              right-skewed errors, then maps predictions back to electron volts for
              downstream screening and conformal prediction intervals.
            </p>
          </Panel>
        </div>
      </Section>
    </main>
  );
}
