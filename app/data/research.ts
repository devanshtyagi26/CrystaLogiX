import { Fragment, createElement } from "react";

const egSymbol = createElement(Fragment, null, "E", createElement("sub", null, "g"));
const rSquaredSymbol = createElement(Fragment, null, "R", createElement("sup", null, "2"));

export const headlineMetrics = [
  { value: "200,487", label: "Crystals Analyzed" },
  { value: "87", label: "Selected Features" },
  { value: "0.2336eV", label: "Global MAE" },
  { value: "0.8945", label: createElement(Fragment, null, "End-to-end ", rSquaredSymbol) },
];

export const datasetFacts = [
  { label: "Metallic share", value: "52.2%", detail: createElement(Fragment, null, egSymbol, " = 0eV ENTRIES") },
  { label: "Nonmetal subset", value: "95,920", detail: "SENT TO STAGE 2" },
  { label: "Train / Calibration / Test", value: "72% / 8% / 20%", detail: "PROPORTIONAL PHASE SPLIT" },
  { label: "Holdout test", value: "40,098", detail: "WITHHELD MATERIALS" },
];

export const featurePipeline = [
  "Materials Project API records provide composition, crystal structure, and DFT-PBE bandgap labels.",
  "GPU chunk-wise featurization expands each material into 145 Magpie-style compositional descriptors.",
  "Variance, collinearity, and intra-group filtering compress the matrix to 87 high-signal descriptors.",
  "Target encoding and scaling are fit only on training data to avoid leakage into calibration or test splits.",
];

export const pipelineStages = [
  {
    step: "01",
    title: "GPU-resident curation",
    eyebrow: "RAPIDS cuDF",
    body: "The corpus is processed on an NVIDIA GeForce RTX 3050 with an approximately 280 MB in-memory footprint, making 200k-entry screening practical on consumer-grade hardware.",
  },
  {
    step: "02",
    title: "Classifier hurdle",
    eyebrow: "XGBoost gate",
    body: "A tuned binary classifier separates metals from nonmetals. Lowering the decision threshold to 0.28 prioritizes nonmetal recall, reducing false negatives from 976 to 411.",
  },
  {
    step: "03",
    title: "Nonmetal regressor",
    eyebrow: "5-model ensemble",
    body: createElement(
      Fragment,
      null,
      "Only positive-bandgap entries are passed to an Optuna-tuned XGBoost ensemble trained on log(1 + ",
      egSymbol,
      "), isolating the continuous prediction problem from the zero spike."
    ),
  },
  {
    step: "04",
    title: "Bias and uncertainty layer",
    eyebrow: "Conformal PI",
    body: "Bin-wise correction reduces high-energy tail bias, while split conformal prediction converts residuals into calibrated 90% and 95% prediction intervals.",
  },
];

export const resultMetrics = [
  { label: "Stage 1 ROC-AUC", value: "0.9843", detail: "PHASE GATE DISCRIMINATION" },
  { label: "Nonmetal recall", value: "97.86%", detail: "OPTIMIZED FOR RECALL" },
  { label: "Stage 2 MAE", value: "0.3758 eV", detail: "BIN-CORRECTED NONMETALS" },
  { label: createElement(Fragment, null, "Stage 2 ", rSquaredSymbol), value: "0.8734", detail: "POSITIVE-GAP SUBSET" },
  { label: "Global MAE", value: "0.2336 eV", detail: "ALL METAL CLASSES" },
  { label: createElement(Fragment, null, "Global ", rSquaredSymbol), value: "0.8945", detail: "END-TO-END PIPELINE" },
];

export const conformalResults = [
  { label: "PI90 coverage", value: "90.56%", width: "2.17 eV mean width" },
  { label: "PI95 coverage", value: "95.09%", width: "2.87 eV mean width" },
  { label: "Calibration set", value: "16,039", width: "unused in model training" },
];

export const benchmarkLift = [
  { model: "CGCNN", gain: "39.8%" },
  { model: "MEGNet", gain: "29.2%" },
  { model: "GATGNN", gain: "27.5%" },
];

export const errorInsights = [
  "Correctly routed samples achieved an MAE of 0.1910 eV, while misrouted samples rose to 0.7595 eV.",
  "Narrow-gap materials in the 0-1 eV range were overestimated by roughly +0.222 eV.",
  "Wide-gap materials above 5 eV were underestimated by roughly -0.420 eV.",
  "The remaining PI90 coverage shortfall is attributable to Stage 1 gate errors rather than the conformal regressor alone.",
];

export const limitations = [
  "Gradient-boosted trees have an extrapolation ceiling for sparse regions such as wide-gap insulators above 5 eV.",
  "Static Magpie descriptors cannot fully encode defect states, surface reconstruction, spin-orbit effects, or complex f-block behavior.",
  "PBE ground-truth labels impose a noise floor for strongly correlated oxides and absolute experimental gap prediction.",
  "Marginal conformal coverage is not automatically conditional across every crystal system or compositional family.",
];

export const applications = [
  {
    title: "Semiconductor and power electronics",
    body: "Retune the gate and objective around high-energy gaps to triage power-device candidates before expensive validation.",
  },
  {
    title: "Photovoltaic manufacturing",
    body: "Prioritize materials around the Shockley-Queisser window of roughly 1.15-1.35 eV and avoid candidates outside the useful bandgap range.",
  },
  {
    title: "Risk-aware R&D screening",
    body: "Use conformal interval width as a decision variable, ranking candidates by both predicted Eg and confidence.",
  },
];

export const sampleMaterials = [
  {
    formula: "Si",
    family: "elemental semiconductor",
    metallicProbability: 0.18,
    prediction: 1.12,
    interval90: 0.34,
    interval95: 0.48,
    descriptorSignal: 64,
  },
  {
    formula: "Fe",
    family: "transition metal",
    metallicProbability: 0.91,
    prediction: 0,
    interval90: 0,
    interval95: 0,
    descriptorSignal: 21,
  },
  {
    formula: "ZnO",
    family: "wide-gap oxide",
    metallicProbability: 0.08,
    prediction: 3.21,
    interval90: 0.42,
    interval95: 0.57,
    descriptorSignal: 83,
  },
  {
    formula: "GaAs",
    family: "III-V semiconductor",
    metallicProbability: 0.13,
    prediction: 1.43,
    interval90: 0.29,
    interval95: 0.41,
    descriptorSignal: 72,
  },
  {
    formula: "SrTiO3",
    family: "perovskite oxide",
    metallicProbability: 0.22,
    prediction: 3.04,
    interval90: 0.58,
    interval95: 0.76,
    descriptorSignal: 78,
  },
];
