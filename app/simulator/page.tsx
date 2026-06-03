import { PageHeader, Panel, Section } from "../components/Section";
import { ScreeningSimulator } from "../components/ScreeningSimulator";
import BandgapPredictor from "../components/BandgapPredictor";

const notes = [
  {
    title: "Threshold",
    body: "The dissertation lowered the classifier threshold to 0.28 to protect nonmetal recall during screening.",
  },
  {
    title: "Confidence",
    body: "PI90 and PI95 represent split-conformal prediction intervals calibrated on held-out entries.",
  },
  {
    title: "Risk tolerance",
    body: "A practical acquisition score trades predicted Eg against interval width, mirroring uncertainty-aware screening.",
  },
];

export default function SimulatorPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Interactive simulator"
        title="Move the gate and watch candidate routing change."
        body="This is a lightweight, client-side demonstration of the hurdle decision flow. It uses representative materials and dissertation-derived thresholds, coverage levels, and screening logic rather than running the original notebook model in-browser."
      />

      <Section className="border-b border-line/10">
        <ScreeningSimulator />
      </Section>

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
      <BandgapPredictor />
    </main>
  );
}
