import { Panel, Section } from "../components/Section";
import BandgapPredictor from "../components/BandgapPredictor";

export const notes = [
  {
    title: "Hurdle Classification",
    body: "The Stage 1 XGBoost classifier uses a 0.30 decision threshold to prioritize nonmetal recall (96.73%), reducing the chance of discarding promising semiconductor candidates.",
  },
  {
    title: "Uncertainty Quantification",
    body: "PI90 and PI95 represent split-conformal prediction intervals generated from held-out calibration data, providing statistically calibrated confidence bounds alongside every prediction.",
  },
  {
    title: "Risk-Aware Screening",
    body: "Candidate materials can be evaluated using both predicted bandgap and interval width, enabling uncertainty-aware prioritization for downstream computational or experimental validation.",
  },
  {
    title: "Dataset Coverage",
    body: "The model was trained and validated on 200,487 Materials Project entries spanning metals, semiconductors, and wide-gap insulators.",
  },
];
export default function SimulatorPage() {
  return (
    <main>
      <BandgapPredictor />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {notes.map((note) => (
            <Panel key={note.title} className="p-6">
              <h2 className="text-lg font-semibold text-warm">{note.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{note.body}</p>
            </Panel>
          ))}
        </div>
      </Section>
    </main>
  );
}
