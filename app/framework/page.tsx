"use client";
import { MetricTile, PageHeader, Panel, Section } from "../components/Section";
import {
  datasetFacts,
  featurePipeline,
  pipelineStages,
} from "../data/research";
import { useTheme } from "next-themes";

export default function FrameworkPage() {
  const { theme } = useTheme();

  return (
    <main>
      <PageHeader
        eyebrow="Framework"
        title="From raw DFT records to a calibrated two-stage predictor."
        body="The dissertation decomposes bandgap prediction into the parts the data actually asks for: a phase decision for the zero-inflated spike, then a positive-gap regressor for nonmetallic materials."
      />

      <Section className="border-b border-line/10">
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

      <Section className="border-b border-line/10">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Feature path
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-warm">
              The feature matrix is small enough to train fast, but still
              grounded in chemistry.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              The notebook begins with Materials Project entries and uses
              compositional statistics as a portable representation of atomic,
              compositional, and structural information. The final 86-feature
              matrix is designed to retain chemically meaningful information
              while remaining computationally efficient. The resulting
              representation supports rapid training, reproducible evaluation,
              and leakage-safe validation across more than 200,000 materials.
            </p>
          </div>
          <Panel className="p-6">
            <div className="space-y-5">
              {featurePipeline.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-4 border-b border-line/10 pb-5 last:border-0 last:pb-0 sm:grid-cols-[56px_1fr]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-teal/12 text-sm font-semibold text-teal">
                    {String.fromCharCode(97 + index)}.
                  </span>
                  <p className="text-sm leading-7 text-body">{item}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section className="border-b border-line/10">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Pipeline Architecture
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-warm sm:text-4xl">
            Two-stage hybrid pipeline overview.
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted">
            The pipeline addresses the highly zero-inflated bandgap distribution
            by separating classification and regression tasks. Materials are
            first classified as metallic or nonmetallic before nonmetallic
            candidates are routed to an ensemble regressor and uncertainty
            quantification layer.
          </p>
        </div>
        <Panel className="p-6">
          <div className="h-full w-full overflow-hidden rounded-md bg-background/60">
            <img
              src="/pipeline.png"
              alt="Pipeline architecture diagram"
              className="h-full w-full object-cover"
              style={theme === "dark" ? { filter: "invert(1)" } : {}}
            />
          </div>
        </Panel>
      </Section>

      <Section className="border-b border-line/10">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            PIPELINE EXECUTION
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-warm sm:text-4xl">
            The Two-Stage Hybrid Architecture.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {pipelineStages.map((stage) => (
            <Panel key={stage.step} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-teal">
                  {stage.step}
                </span>
                <span className="rounded bg-gold/12 px-3 py-1 text-xs uppercase tracking-[0.16em] text-gold">
                  {stage.eyebrow}
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-warm">
                {stage.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-soft">
                {stage.body}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            MATHEMATICAL MODELING
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight text-warm sm:text-4xl">
            Target Transformations & Objective Functions.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Panel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-teal">
              Stage 1 target
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-warm">
              <i>y</i> maps to 0 for metals, <i>y</i> maps to 1 for nonmetals
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              The Stage 1 XGBoost classifier predicts whether a material belongs
              to the metallic (Eg = 0 eV) or nonmetallic (Eg {">"} 0 eV) class.
              This separation removes the dominant zero spike from the
              regression task and enables specialized modelling of positive
              bandgaps.
            </p>
          </Panel>
          <Panel className="p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Stage 2 target
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-warm">
              <i>
                log(1 + E<sub>g</sub>)
              </i>{" "}
              for positive bandgaps
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              The Stage 2 ensemble regressor operates only on nonmetallic
              materials using the transformed target log(1 + Eg). This reduces
              target skewness, improves numerical stability, and enhances
              prediction quality across a broad range of semiconductor and
              insulating materials.
            </p>
          </Panel>
        </div>
      </Section>
    </main>
  );
}
