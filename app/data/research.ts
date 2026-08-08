import { Fragment, createElement } from "react";

const egSymbol = createElement(
  Fragment,
  null,
  "E",
  createElement("sub", null, "g"),
);
const rSquaredSymbol = createElement(
  Fragment,
  null,
  "R",
  createElement("sup", null, "2"),
);

export const headlineMetrics = [
  { value: "200,487", label: "Materials Analyzed" },
  { value: "86", label: "Selected Features" },
  { value: "0.2447 eV", label: "Global MAE" },
  {
    value: "0.8879",
    label: createElement(Fragment, null, "End-to-end ", rSquaredSymbol),
  },
];

export const datasetFacts = [
  {
    label: "Metallic share",
    value: "52.2%",
    detail: createElement(Fragment, null, egSymbol, " = 0eV ENTRIES"),
  },
  { label: "Nonmetal subset", value: "95,920", detail: "SENT TO STAGE 2" },
  {
    label: "Train / Calibration / Test",
    value: "72% / 8% / 20%",
    detail: "PROPORTIONAL PHASE SPLIT",
  },
  { label: "Holdout test", value: "40,098", detail: "WITHHELD MATERIALS" },
];

export const featurePipeline = [
  "Materials Project API records provide composition, crystal structure, and DFT-PBE bandgap labels.",
  "GPU chunk-wise featurization expands each material into 145 Magpie-style compositional descriptors.",
  "Variance, correlation, and domain-aware filtering compress the feature matrix to 86 high-signal descriptors.",
  "Target encoding and scaling are fit exclusively on training data to prevent leakage into calibration and test sets.",
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
    body: "A tuned binary classifier separates metals from nonmetals. A 0.30 operating threshold prioritizes nonmetal recall (96.73%), reducing the risk of discarding promising semiconductor candidates.",
  },
  {
    step: "03",
    title: "Nonmetal regressor",
    eyebrow: "5-model ensemble",
    body: createElement(
      Fragment,
      null,
      "Only positive-bandgap materials are routed to an Optuna-tuned five-member XGBoost ensemble trained on log(1 + ",
      egSymbol,
      "), transforming a highly skewed regression problem into a stable prediction task.",
    ),
  },
  {
    step: "04",
    title: "Bias and uncertainty layer",
    eyebrow: "Conformal prediction",
    body: "Bin-wise bias correction mitigates systematic underestimation in wide-gap materials, while split conformal prediction generates calibrated 90% and 95% prediction intervals.",
  },
];

export const resultMetrics = [
  {
    label: "Stage 1 Accuracy",
    value: "91.29%",
    detail: "METAL / NONMETAL CLASSIFICATION",
  },
  {
    label: "Stage 1 ROC-AUC",
    value: "0.9774",
    detail: "CLASSIFIER DISCRIMINATION",
  },
  { label: "Nonmetal Recall", value: "96.73%", detail: "THRESHOLD = 0.30" },
  { label: "Global MAE", value: "0.2447 eV", detail: "ALL MATERIAL CLASSES" },
  { label: "Global MedAE", value: "0.0455 eV", detail: "ROBUST ERROR MEASURE" },
  {
    label: createElement(Fragment, null, "Global ", rSquaredSymbol),
    value: "0.8879",
    detail: "END-TO-END PIPELINE",
  },
];

export const conformalResults = [
  { label: "PI90 coverage", value: "90.29%", width: "Target 90%" },
  { label: "PI95 coverage", value: "95.06%", width: "Target 95%" },
  {
    label: "Calibration set",
    value: "16,039",
    width: "unused in model training",
  },
];

export const benchmarkLift = [
  {
    model: "DFT-PBE",
    improvement: 59.2,
    mae: 0.6,
    note: "Raw DFT-PBE calculations typically exhibit MAE values between 0.60 and 1.00 eV due to systematic bandgap underestimation.",
  },
  {
    model: "GATGNN",
    improvement: 24.0,
    mae: 0.322,
    note: "Graph Attention-based GNN for crystal bandgap prediction.",
  },
  {
    model: "CGCNN",
    improvement: 36.9,
    mae: 0.388,
    note: "Crystal Graph Convolutional Neural Network baseline.",
  },
  {
    model: "MEGNet",
    improvement: 25.9,
    mae: 0.33,
    note: "Materials Graph Network benchmark model.",
  },
  {
    model: "EMGen",
    improvement: 30.7,
    mae: 0.353,
    note: "Element-Learning model for bandgap prediction.",
  },
  {
    model: "CrystaLogiX",
    improvement: 0,
    mae: 0.2447,
    note: "Proposed hurdle-learning framework with ensemble regression and conformal uncertainty quantification.",
  },
];

export const benchmarkHighlights = [
  "36.9% lower MAE than CGCNN",
  "25.9% lower MAE than MEGNet",
  "24.0% lower MAE than GATGNN",
  "30.7% lower MAE than EMGen",
  "Only method in the comparison providing calibrated uncertainty quantification",
];

export const errorInsights = [
  "Most prediction error originates from difficult boundary cases near the metal–nonmetal transition region.",
  "Materials with bandgaps below 1 eV remain challenging due to overlap between metallic and semiconducting behaviour.",
  "Wide-gap insulators above 5 eV exhibit mild underestimation despite bin-wise bias correction.",
  "Conformal prediction intervals remain well calibrated, achieving near-target empirical coverage at both 90% and 95% confidence levels.",
];

export const keyContributions = [
  "52.2% of the Materials Project dataset consists of metallic materials with Eg = 0 eV.",
  "Traditional regression models struggle with this highly zero-inflated distribution.",
  "The hurdle framework first classifies materials as metal or nonmetal.",
  "Bandgap regression is then performed only on nonmetallic materials.",
  "This decomposition enables state-of-the-art accuracy while preserving computational efficiency.",
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
